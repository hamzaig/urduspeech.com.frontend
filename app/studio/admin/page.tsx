"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { api, ApiError, explain, minutes, money, mutation } from "@/lib/api";
import type {
  AdminSession,
  AdminSettings,
  ComputeAccounts,
  ComputeAccountInput,
  ComputeAccountPatch,
  AdminUser,
  AdminUserDetail,
  AdminUsers,
  ContactMessage,
  ContactMessages,
  ManualPaymentReviews,
} from "@/lib/contracts";
import { PageTitle, ErrorNotice, Saved } from "@/components/common";
import { AdminRenderFeedback } from "@/components/admin-render-feedback";
import "@/components/admin-render-feedback.css";
type Setting = AdminSettings["settings"][number];
type Account = ComputeAccounts["accounts"][number];
type Payment = ManualPaymentReviews["items"][number];
const methodName: Record<string, string> = {
  easypaisa: "Easypaisa",
  bank_transfer: "Bank transfer",
  sadapay: "SadaPay",
  nayapay: "NayaPay",
  jazzcash: "JazzCash",
};
function failure(error: unknown) {
  if (error instanceof ApiError) {
    if (
      error.code === "ADMIN_REAUTH_REQUIRED" ||
      error.code === "RECENT_AUTH_REQUIRED"
    )
      return "Sign in again before changing settings or approving payments.";
    if (error.code.includes("VERSION_CONFLICT"))
      return "This item changed in another session. Refresh it before saving again.";
    if (error.code === "COMPUTE_OPERATION_UNKNOWN")
      return "The test outcome is still being checked. Its sandbox must be confirmed stopped before another attempt.";
    if (error.code === "COMPUTE_OPERATION_BUSY")
      return "This test is still running. Wait, then try the same test again.";
  }
  return explain(error);
}
export default function Admin() {
  const [session, setSession] = useState<AdminSession | null>(null),
    [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    api<AdminSession>("/v1/admin/session")
      .then((value) => {
        if (live) setSession(value);
      })
      .catch((e) => {
        if (live) setError(failure(e));
      });
    return () => {
      live = false;
    };
  }, []);
  if (error)
    return (
      <div className="page">
        <ErrorNotice message={error} />
      </div>
    );
  if (!session)
    return (
      <div className="page">
        <p role="status">Checking owner access…</p>
      </div>
    );
  if (!session.admin)
    return (
      <div className="page">
        <PageTitle
          title="Owner access required"
          description="Sign in with the UrduSpeech owner account to manage operations."
        />
        <div className="actions">
          <Link className="button" href="/auth/sign-in?next=/studio/admin">
            Sign in as owner
          </Link>
          <Link className="button secondary" href="/studio">
            Back to my projects
          </Link>
        </div>
      </div>
    );
  return (
    <div className="page operations">
      <PageTitle
        title="Operations"
        description="Manage service accounts, payment reviews and private configuration."
      />
      {!session.fresh && (
        <p className="notice">
          Changes need a recent sign-in.{" "}
          <Link href="/auth/sign-in?next=/studio/admin">Sign in again</Link>.
        </p>
      )}
      <nav className="operations-nav" aria-label="Operations sections">
        <a href="#users">Users</a>
        <a href="#contact-messages">Contact messages</a>
        <a href="#render-feedback">Render feedback</a>
        <a href="#payment-reviews">Payment reviews</a>
        <a href="#compute-accounts">Modal accounts</a>
        <a href="#private-settings">Service settings</a>
      </nav>
      <UserDirectory fresh={session.fresh} />
      <ContactInbox />
      <AdminRenderFeedback />
      <PaymentReviews fresh={session.fresh} />
      <ModalAccounts fresh={session.fresh} />
      <ServiceSettings fresh={session.fresh} />
    </div>
  );
}
function ServiceSettings({ fresh }: { fresh: boolean }) {
  const [settings, setSettings] = useState<Setting[]>([]),
    [filter, setFilter] = useState(""),
    [error, setError] = useState(""),
    [loaded, setLoaded] = useState(false);
  async function load() {
    try {
      setSettings((await api<AdminSettings>("/v1/admin/settings")).settings);
      setLoaded(true);
      setError("");
    } catch (e) {
      setError(failure(e));
    }
  }
  useEffect(() => {
    void load();
  }, []);
  return (
    <section id="private-settings" className="operations-section">
      <div className="operations-heading">
        <div>
          <h2>Service settings</h2>
          <p>
            Saved values are encrypted. Secrets are replaced here and never
            displayed. Saved changes apply after the API and workers restart.
          </p>
        </div>
        <button className="secondary" onClick={load}>
          Refresh settings
        </button>
      </div>
      {error && <ErrorNotice message={error} />}
      <label className="field">
        Find a setting
        <input
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="OpenAI, email, storage or payments"
        />
      </label>
      {!loaded && !error && <p role="status">Loading service settings…</p>}
      <div className="setting-list">
        {settings
          .filter((row) =>
            (row.label + row.key).toLowerCase().includes(filter.toLowerCase()),
          )
          .map((row) => (
            <SettingEditor
              key={row.key + row.version}
              setting={row}
              fresh={fresh}
              saved={load}
            />
          ))}
      </div>
      <p className="field-help">
        Database access, owner identity and encryption master keys are
        configured on the server.
      </p>
    </section>
  );
}
function SettingEditor({
  setting,
  fresh,
  saved,
}: {
  setting: Setting;
  fresh: boolean;
  saved: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const key = useRef(crypto.randomUUID());
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setError("");
    try {
      await api(
        "/v1/admin/settings/" + setting.key,
        mutation(
          "POST",
          {
            value: String(new FormData(form).get("value")),
            expectedVersion: setting.version,
          },
          key.current,
        ),
      );
      form.reset();
      await saved();
    } catch (e) {
      setError(failure(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="setting-row">
      <summary>
        <span>
          <strong>{setting.label}</strong>
          <small>{setting.key}</small>
        </span>
        <span>
          {setting.configured
            ? "Saved · version " + setting.version
            : "Not saved"}
        </span>
      </summary>
      <form onSubmit={save}>
        <label className="field">
          {setting.secret ? "New secret value" : "Value"}
          <input
            name="value"
            type={setting.secret ? "password" : "text"}
            defaultValue={setting.secret ? "" : (setting.value ?? "")}
            autoComplete={setting.secret ? "new-password" : "off"}
            required
            maxLength={65536}
            spellCheck={false}
            disabled={!fresh || busy}
          />
        </label>
        {error && <ErrorNotice message={error} />}
        <button disabled={!fresh || busy}>
          {busy
            ? "Saving…"
            : setting.secret
              ? "Replace secret"
              : "Save setting"}
        </button>
      </form>
    </details>
  );
}
function ModalAccounts({ fresh }: { fresh: boolean }) {
  const [accounts, setAccounts] = useState<Account[]>([]),
    [edit, setEdit] = useState<Account | "new" | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(""),
    [message, setMessage] = useState("");
  const testKeys = useRef(new Map<string, string>());
  async function load() {
    try {
      setAccounts(
        (await api<ComputeAccounts>("/v1/admin/compute/accounts")).accounts,
      );
      setError("");
    } catch (e) {
      setError(failure(e));
    }
  }
  useEffect(() => {
    void load();
  }, []);
  async function test(account: Account) {
    setBusy(account.id);
    setError("");
    setMessage("");
    const identity = account.id + ":" + account.version;
    const key = testKeys.current.get(identity) ?? crypto.randomUUID();
    testKeys.current.set(identity, key);
    try {
      const result = await api<{ ok: true; version: number }>(
        `/v1/admin/compute/accounts/${account.id}/test`,
        mutation("POST", {}, key),
      );
      testKeys.current.delete(identity);
      setMessage(
        account.name +
          " passed its connection and runtime test (version " +
          result.version +
          ").",
      );
      await load();
    } catch (e) {
      setError(failure(e));
    } finally {
      setBusy("");
    }
  }
  return (
    <section id="compute-accounts" className="operations-section">
      <div className="operations-heading">
        <div>
          <h2>Modal accounts</h2>
          <p>
            Lower priority numbers are tried first. Quota and temporary errors
            can use the next available account once the previous sandbox is
            confirmed stopped.
          </p>
        </div>
        <button disabled={!fresh || !!busy} onClick={() => setEdit("new")}>
          Add Modal account
        </button>
      </div>
      {error && <ErrorNotice message={error} />}{" "}
      {message && <Saved>{message}</Saved>}
      {accounts.length === 0 && !error && (
        <p>
          No accounts are listed. Add the first account or import the server
          configuration.
        </p>
      )}
      <div className="account-list">
        {accounts.map((account) => (
          <article className="account-row" key={account.id}>
            <div>
              <h3>{account.name}</h3>
              <p>
                {account.enabled
                  ? account.status === "quarantined"
                    ? "Needs attention"
                    : "Enabled"
                  : "Disabled"}{" "}
                · Priority {account.priority} · {account.maxConcurrent}{" "}
                concurrent
              </p>
              <small>
                {account.config.appName} / {account.config.environment} ·{" "}
                {account.config.imageId ?? "image building — next sync adds it"}
              </small>
              {account.config.alignmentImageId && (
                <small>
                  Alignment image: {account.config.alignmentImageId}
                </small>
              )}
              {account.lastError && (
                <p>
                  Last issue: {account.lastError}.{" "}
                  {account.cooldownUntil
                    ? "Cooldown until " +
                      new Date(account.cooldownUntil).toLocaleTimeString()
                    : "Review configuration and test the account."}
                </p>
              )}
            </div>
            <div className="actions">
              <button
                className="secondary"
                disabled={!fresh || !!busy}
                onClick={() => setEdit(account)}
              >
                Edit account
              </button>
              <button
                className="text-button"
                disabled={!fresh || !!busy}
                onClick={() => test(account)}
              >
                {busy === account.id ? "Testing…" : "Test connection"}
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="field-help">
        Each test starts one sandbox, limited to 1 CPU, 2 GiB memory and 60
        seconds. Provider usage may be billed.
      </p>
      {edit && (
        <AccountEditor
          key={edit === "new" ? "new" : edit.id + edit.version}
          account={edit === "new" ? null : edit}
          cancel={() => setEdit(null)}
          saved={async () => {
            setEdit(null);
            await load();
          }}
        />
      )}
    </section>
  );
}
function AccountEditor({
  account,
  cancel,
  saved,
}: {
  account: Account | null;
  cancel: () => void;
  saved: () => Promise<void>;
}) {
  const [rotate, setRotate] = useState(!account),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const key = useRef(crypto.randomUUID());
  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget,
      data = new FormData(form),
      value = (name: string) => String(data.get(name) ?? "");
    setBusy(true);
    setError("");
    try {
      const config: ComputeAccountInput["config"] | undefined = rotate
        ? {
            provider: "modal",
            tokenId: value("tokenId"),
            tokenSecret: value("tokenSecret"),
            appName: value("appName"),
            environment: value("environment"),
            ...(value("imageId").trim()
              ? { imageId: value("imageId").trim() }
              : {}),
            ...(value("alignmentImageId").trim()
              ? { alignmentImageId: value("alignmentImageId").trim() }
              : {}),
            cpu: Number(value("cpu")),
            memoryMiB: Number(value("memoryMiB")),
            timeoutMs: Number(value("timeoutMs")),
          }
        : undefined;
      const common = {
        name: value("name"),
        priority: Number(value("priority")),
        maxConcurrent: Number(value("maxConcurrent")),
        enabled: data.has("enabled"),
      };
      if (account) {
        const body: ComputeAccountPatch = {
          ...common,
          expectedVersion: account.version,
          ...(config ? { config } : {}),
        };
        await api(
          `/v1/admin/compute/accounts/${account.id}`,
          mutation("PATCH", body, key.current),
        );
      } else {
        const body: ComputeAccountInput = { ...common, config: config! };
        await api(
          "/v1/admin/compute/accounts",
          mutation("POST", body, key.current),
        );
      }
      form.reset();
      await saved();
    } catch (e) {
      setError(failure(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="operations-editor" onSubmit={save} autoComplete="off">
      <h3>{account ? "Edit " + account.name : "Add Modal account"}</h3>
      {error && <ErrorNotice message={error} />}
      <fieldset disabled={busy}>
        <div className="operations-fields">
          <label className="field">
            Account name
            <input
              name="name"
              defaultValue={account?.name ?? ""}
              maxLength={100}
              required
            />
          </label>
          <label className="field">
            Priority
            <input
              name="priority"
              type="number"
              defaultValue={account?.priority ?? 100}
              min={0}
              max={10000}
              required
            />
          </label>
          <label className="field">
            Concurrent sandboxes
            <input
              name="maxConcurrent"
              type="number"
              defaultValue={account?.maxConcurrent ?? 1}
              min={1}
              max={16}
              required
            />
          </label>
        </div>
        <label className="check-row">
          <input
            type="checkbox"
            name="enabled"
            defaultChecked={account?.enabled ?? true}
          />
          Use this account for new work
        </label>
        {account && (
          <label className="check-row">
            <input
              type="checkbox"
              checked={rotate}
              onChange={(e) => setRotate(e.target.checked)}
            />
            Replace credentials and runtime configuration
          </label>
        )}
        {rotate && (
          <>
            <div className="operations-fields">
              <label className="field">
                Token ID
                <input
                  name="tokenId"
                  type="password"
                  autoComplete="new-password"
                  required
                  pattern="ak-[A-Za-z0-9_-]+"
                />
              </label>
              <label className="field">
                Token secret
                <input
                  name="tokenSecret"
                  type="password"
                  autoComplete="new-password"
                  minLength={16}
                  required
                />
              </label>
              <label className="field">
                Modal app name
                <input
                  name="appName"
                  defaultValue={
                    account?.config.appName ?? "urduspeech-compute-production"
                  }
                  required
                />
              </label>
              <label className="field">
                Environment
                <input
                  name="environment"
                  defaultValue={account?.config.environment ?? "main"}
                  required
                />
              </label>
              <label className="field">
                Immutable image ID (optional)
                <input
                  name="imageId"
                  defaultValue={account?.config.imageId ?? ""}
                  placeholder="im-…"
                  pattern="im-[A-Za-z0-9]+"
                />
                <small>
                  Leave empty for a new account: the image sync builds it in
                  this Modal account automatically (within an hour).
                </small>
              </label>
              <label className="field">
                Acoustic alignment image ID (optional)
                <input
                  name="alignmentImageId"
                  defaultValue={account?.config.alignmentImageId ?? ""}
                  placeholder="im-…"
                  pattern="im-[A-Za-z0-9]+"
                />
                <small>
                  Use the pinned GPU model image built in this Modal account.
                </small>
              </label>
              <label className="field">
                CPU
                <input
                  name="cpu"
                  type="number"
                  min={0.5}
                  max={4}
                  step={0.5}
                  defaultValue={account?.config.cpu ?? 4}
                  required
                />
              </label>
              <label className="field">
                Memory (MiB)
                <input
                  name="memoryMiB"
                  type="number"
                  min={512}
                  max={8192}
                  defaultValue={account?.config.memoryMiB ?? 4096}
                  required
                />
              </label>
              <label className="field">
                Timeout (milliseconds)
                <input
                  name="timeoutMs"
                  type="number"
                  min={60000}
                  max={7200000}
                  defaultValue={account?.config.timeoutMs ?? 7200000}
                  required
                />
              </label>
            </div>
            <p className="field-help">
              Use the qualified UrduSpeech image available in this Modal
              account. Earlier credential versions remain encrypted so running
              work can still be stopped after rotation.
            </p>
          </>
        )}
        <div className="actions">
          <button>{busy ? "Saving…" : "Save account"}</button>
          <button type="button" className="secondary" onClick={cancel}>
            Cancel
          </button>
        </div>
      </fieldset>
    </form>
  );
}
function PaymentReviews({ fresh }: { fresh: boolean }) {
  const [items, setItems] = useState<Payment[]>([]),
    [error, setError] = useState(""),
    [loaded, setLoaded] = useState(false),
    [cursor, setCursor] = useState<string | null>(null);
  async function load(after?: string) {
    try {
      const result = await api<ManualPaymentReviews>(
        "/v1/admin/billing/manual-payments?limit=25" +
          (after ? "&after=" + after : ""),
      );
      setItems((old) =>
        after
          ? [
              ...old,
              ...result.items.filter(
                (item) =>
                  !old.some((row) => row.transactionId === item.transactionId),
              ),
            ]
          : result.items,
      );
      setCursor(result.nextCursor);
      setLoaded(true);
      setError("");
    } catch (e) {
      setError(failure(e));
    }
  }
  useEffect(() => {
    void load();
  }, []);
  return (
    <section id="payment-reviews" className="operations-section">
      <div className="operations-heading">
        <div>
          <h2>Payment reviews</h2>
          <p>
            Check the receiving account yourself. A customer reference or
            receipt does not confirm that funds arrived.
          </p>
        </div>
        <button className="secondary" onClick={() => load()}>
          Refresh payments
        </button>
      </div>
      {error && <ErrorNotice message={error} />}{" "}
      {!loaded && !error && <p role="status">Loading pending payments…</p>}
      {loaded && items.length === 0 && (
        <p>No payments are waiting for review.</p>
      )}
      {items.map((payment) => (
        <PaymentReview
          key={payment.transactionId}
          payment={payment}
          fresh={fresh}
          saved={() => load()}
        />
      ))}
      {cursor && (
        <button className="secondary" onClick={() => load(cursor)}>
          Load more payments
        </button>
      )}
    </section>
  );
}
function PaymentReview({
  payment,
  fresh,
  saved,
}: {
  payment: Payment;
  fresh: boolean;
  saved: () => Promise<void>;
}) {
  const [checked, setChecked] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const intent = useRef<{ body: string; key: string } | null>(null);
  async function decide(action: "approve" | "reject", form: HTMLFormElement) {
    const data = new FormData(form),
      raw = String(data.get("amount") ?? "");
    if (action === "approve" && (!checked || !/^\d+(\.\d{1,2})?$/.test(raw))) {
      setError(
        "Confirm receipt and enter the amount actually received in PKR.",
      );
      return;
    }
    const body =
      action === "approve"
        ? {
            verifiedAmountMinor: Math.round(Number(raw) * 100),
            verifiedCurrency: "PKR",
            verifiedDestinationId: payment.destination.destinationId,
            settlementReference: String(data.get("reference") ?? ""),
          }
        : { reason: String(data.get("reason")) };
    const identity = JSON.stringify({ action, body });
    if (intent.current?.body !== identity)
      intent.current = { body: identity, key: crypto.randomUUID() };
    setBusy(true);
    setError("");
    try {
      await api(
        `/v1/admin/billing/manual-payments/${payment.transactionId}/${action}`,
        mutation("POST", body, intent.current.key),
      );
      await saved();
    } catch (e) {
      setError(failure(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <details className="payment-review">
      <summary>
        <span>
          <strong>{money(payment.amountMinor)}</strong>
          <small>
            {methodName[payment.method] ?? payment.method} ·{" "}
            {new Date(
              payment.submittedAt ?? payment.createdAt,
            ).toLocaleString()}
          </small>
        </span>
        <span>Review payment</span>
      </summary>
      <dl className="payment-details">
        <dt>Receiving account</dt>
        <dd>
          {payment.destination.accountTitle} ·{" "}
          {payment.destination.bankName ?? methodName[payment.method]} ·{" "}
          {payment.destination.accountNumber}
        </dd>
        <dt>Customer reference (unverified)</dt>
        <dd>{payment.claimedReference ?? "No reference supplied"}</dd>
        <dt>Transaction</dt>
        <dd>{payment.transactionId}</dd>
      </dl>
      {error && <ErrorNotice message={error} />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void decide("approve", e.currentTarget);
        }}
      >
        <fieldset disabled={!fresh || busy}>
          <div className="operations-fields">
            <label className="field">
              Amount actually received (PKR)
              <input
                name="amount"
                type="text"
                inputMode="decimal"
                required
                placeholder="0.00"
                pattern="[0-9]+(\.[0-9]{1,2})?"
              />
            </label>
            <label className="field">
              Verified bank or wallet reference
              <input
                name="reference"
                required
                maxLength={128}
                autoComplete="off"
              />
            </label>
          </div>
          <label className="check-row">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            I checked this receiving account and confirmed the payment arrived.
          </label>
          <button disabled={!checked}>
            {busy ? "Saving decision…" : "Approve and activate plan"}
          </button>
        </fieldset>
      </form>
      <form
        className="review-rejection"
        onSubmit={(e) => {
          e.preventDefault();
          void decide("reject", e.currentTarget);
        }}
      >
        <fieldset disabled={!fresh || busy}>
          <label className="field">
            Reason for rejection
            <select name="reason">
              <option value="NOT_RECEIVED">Payment not received</option>
              <option value="AMOUNT_MISMATCH">Amount does not match</option>
              <option value="WRONG_DESTINATION">Wrong receiving account</option>
              <option value="DUPLICATE_REFERENCE">
                Reference used already
              </option>
              <option value="UNVERIFIABLE">Could not verify</option>
            </select>
          </label>
          <button className="secondary">Reject payment</button>
        </fieldset>
      </form>
    </details>
  );
}
function ContactInbox() {
  const [items, setItems] = useState<ContactMessage[]>([]),
    [unread, setUnread] = useState(0),
    [more, setMore] = useState(false),
    [loaded, setLoaded] = useState(false),
    [error, setError] = useState("");
  async function load(before?: string) {
    try {
      const result = await api<ContactMessages>(
        "/v1/admin/contact-messages" +
          (before ? "?before=" + encodeURIComponent(before) : ""),
      );
      setItems((old) =>
        before
          ? [
              ...old,
              ...result.messages.filter((m) => !old.some((o) => o.id === m.id)),
            ]
          : result.messages,
      );
      setUnread(result.unread);
      setMore(result.messages.length === 50);
      setLoaded(true);
      setError("");
    } catch (e) {
      setError(failure(e));
    }
  }
  async function mark(item: ContactMessage, read: boolean) {
    try {
      const updated = await api<ContactMessage>(
        `/v1/admin/contact-messages/${item.id}`,
        mutation("PATCH", { read }),
      );
      setItems((old) => old.map((m) => (m.id === updated.id ? updated : m)));
      setUnread((n) => Math.max(0, n + (read ? -1 : 1)));
    } catch (e) {
      setError(failure(e));
    }
  }
  useEffect(() => {
    void load();
  }, []);
  return (
    <section id="contact-messages" className="operations-section">
      <div className="operations-heading">
        <div>
          <h2>Contact messages{unread > 0 ? ` (${unread} unread)` : ""}</h2>
          <p>
            Messages sent from the public contact form. Reply from your own
            mailbox; nothing is e-mailed automatically.
          </p>
        </div>
        <button className="secondary" onClick={() => load()}>
          Refresh messages
        </button>
      </div>
      {error && <ErrorNotice message={error} />}
      {!loaded && !error && <p role="status">Loading messages…</p>}
      {loaded && items.length === 0 && <p>No contact messages yet.</p>}
      {items.map((item) => (
        <article
          key={item.id}
          className="panel"
          aria-label={`Message from ${item.name}`}
        >
          <p>
            <strong>{item.read ? item.subject : "● " + item.subject}</strong>
            <br />
            {item.name} &lt;
            <a href={`mailto:${encodeURIComponent(item.email)}`}>
              {item.email}
            </a>
            &gt; · {new Date(item.createdAt).toLocaleString()}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>{item.message}</p>
          <button className="secondary" onClick={() => mark(item, !item.read)}>
            {item.read ? "Mark unread" : "Mark read"}
          </button>
        </article>
      ))}
      {more && (
        <button
          className="secondary"
          onClick={() => load(items[items.length - 1]?.createdAt)}
        >
          Load older messages
        </button>
      )}
    </section>
  );
}
function date(value: string | null) {
  return value ? new Date(value).toLocaleString() : "—";
}
function UserDirectory({ fresh }: { fresh: boolean }) {
  const [users, setUsers] = useState<AdminUser[]>([]),
    [totals, setTotals] = useState<AdminUsers["totals"] | null>(null),
    [next, setNext] = useState<string | null>(null),
    [q, setQ] = useState(""),
    [filter, setFilter] = useState("all"),
    [error, setError] = useState("");
  async function load(before?: string) {
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (filter !== "all") params.set("filter", filter);
      if (before) params.set("before", before);
      const result = await api<AdminUsers>(
        "/v1/admin/users" + (params.size ? "?" + params : ""),
      );
      setUsers((old) => (before ? [...old, ...result.users] : result.users));
      setTotals(result.totals);
      setNext(result.nextBefore);
      setError("");
    } catch (e) {
      setError(failure(e));
    }
  }
  useEffect(() => {
    void load();
    // Reload only when the filter changes; search runs on submit.
  }, [filter]);
  return (
    <section id="users" className="operations-section">
      <div className="operations-heading">
        <div>
          <h2>Users</h2>
          <p>
            {totals
              ? `${totals.users} users · ${totals.paid} on a paid plan · ${totals.blocked} blocked. `
              : ""}
            Shows account status, usage and payments only; transcripts and media
            stay private.
          </p>
        </div>
        <button className="secondary" onClick={() => load()}>
          Refresh users
        </button>
      </div>
      <form
        className="user-filters"
        onSubmit={(e) => {
          e.preventDefault();
          void load();
        }}
      >
        <input
          type="search"
          placeholder="Search by email or name"
          aria-label="Search users"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          aria-label="Filter users"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All users</option>
          <option value="paid">Paid plans</option>
          <option value="free">Free plan</option>
          <option value="unverified">Email not verified</option>
          <option value="blocked">Blocked</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {error && <ErrorNotice message={error} />}
      {totals && users.length === 0 && <p>No users match.</p>}
      {users.map((user) => (
        <UserRow
          key={user.id}
          user={user}
          fresh={fresh}
          changed={(u) =>
            setUsers((old) => old.map((o) => (o.id === u.id ? u : o)))
          }
        />
      ))}
      {next && (
        <button className="secondary" onClick={() => load(next)}>
          Load more users
        </button>
      )}
    </section>
  );
}
function UserRow({
  user,
  fresh,
  changed,
}: {
  user: AdminUser;
  fresh: boolean;
  changed: (user: AdminUser) => void;
}) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null),
    [plan, setPlan] = useState("starter"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState("");
  async function open() {
    try {
      setDetail(await api<AdminUserDetail>(`/v1/admin/users/${user.id}`));
    } catch (e) {
      setError(failure(e));
    }
  }
  async function act(
    path: string,
    body: object,
    done: string,
    confirmText: string,
  ) {
    if (!window.confirm(confirmText)) return;
    setBusy(true);
    setNotice("");
    try {
      const updated = await api<AdminUser>(
        `/v1/admin/users/${user.id}/${path}`,
        mutation("POST", body, crypto.randomUUID()),
      );
      changed(updated);
      setNotice(done);
      setError("");
      await open();
    } catch (e) {
      setError(
        e instanceof ApiError && e.code === "PLAN_GRANT_CONFLICT"
          ? "This user already has a paid plan for this period."
          : e instanceof ApiError && e.code === "CANNOT_MODIFY_SELF"
            ? "You cannot block your own account."
            : failure(e),
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <details
      className="user-row"
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open && !detail)
          void open();
      }}
    >
      <summary>
        <span>
          <strong>
            {user.blocked ? "⛔ " : ""}
            {user.email}
          </strong>
          <small>
            {user.name || "No name"} · joined {date(user.createdAt)} · last
            sign-in {date(user.lastLoginAt)}
          </small>
        </span>
        <span>
          {user.plan.name}
          {!user.emailVerified && " · unverified"}
        </span>
      </summary>
      <div>
        {error && <ErrorNotice message={error} />}
        {notice && <Saved>{notice}</Saved>}
        {!detail && !error && <p role="status">Loading user…</p>}
        {detail && (
          <>
            <dl>
              <div>
                <dt>Plan</dt>
                <dd>
                  {detail.user.plan.name}
                  {detail.user.plan.endsAt
                    ? ` until ${date(detail.user.plan.endsAt)}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt>Minutes used / allowance</dt>
                <dd>
                  {minutes(detail.usage.consumedSeconds)} /{" "}
                  {minutes(detail.usage.allowanceSeconds)} min (
                  {minutes(Math.max(0, detail.usage.remainingSeconds))} left)
                </dd>
              </div>
              <div>
                <dt>Projects / uploads</dt>
                <dd>
                  {detail.counts.projects} / {detail.counts.uploads}
                  {detail.counts.failedUploads
                    ? ` (${detail.counts.failedUploads} failed)`
                    : ""}
                </dd>
              </div>
              <div>
                <dt>Jobs by state</dt>
                <dd>
                  {Object.entries(detail.jobs)
                    .map(([state, n]) => `${state}: ${n}`)
                    .join(", ") || "None"}
                </dd>
              </div>
            </dl>
            <h3>Recent jobs</h3>
            {detail.recentJobs.length === 0 ? (
              <p>No jobs yet.</p>
            ) : (
              <ul>
                {detail.recentJobs.map((j) => (
                  <li key={j.id}>
                    {date(j.createdAt)} · {j.state}
                    {j.durationSeconds !== null
                      ? ` · ${minutes(j.durationSeconds)} min`
                      : ""}
                  </li>
                ))}
              </ul>
            )}
            <h3>Payments</h3>
            {detail.payments.length === 0 ? (
              <p>No payments.</p>
            ) : (
              <ul>
                {detail.payments.map((p) => (
                  <li key={p.id}>
                    {date(p.createdAt)} · {p.plan ?? "—"} ·{" "}
                    {money(p.amountMinor)} · {p.provider} · {p.status}
                  </li>
                ))}
              </ul>
            )}
            <h3>Actions</h3>
            {!fresh && (
              <p className="notice">
                Actions need a recent sign-in.{" "}
                <Link href="/auth/sign-in?next=/studio/admin">
                  Sign in again
                </Link>
                .
              </p>
            )}
            <div className="actions">
              <select
                aria-label="Plan to give"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                disabled={busy || !fresh}
              >
                <option value="starter">Starter</option>
                <option value="creator">Creator</option>
                <option value="studio">Studio</option>
              </select>
              <button
                disabled={busy || !fresh}
                onClick={() =>
                  act(
                    "plan",
                    { plan },
                    `${plan} plan given for one month.`,
                    `Give ${user.email} the ${plan} plan free for one month?`,
                  )
                }
              >
                Give plan for 1 month
              </button>
              <button
                className="secondary"
                disabled={busy || !fresh}
                onClick={() =>
                  act(
                    "block",
                    { blocked: !user.blocked },
                    user.blocked
                      ? "User unblocked."
                      : "User blocked and signed out.",
                    user.blocked
                      ? `Unblock ${user.email}?`
                      : `Block ${user.email}? They will be signed out and cannot use the app.`,
                  )
                }
              >
                {user.blocked ? "Unblock user" : "Block user"}
              </button>
            </div>
          </>
        )}
      </div>
    </details>
  );
}
