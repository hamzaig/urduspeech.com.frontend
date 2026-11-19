"use client";
import { useEffect, useRef, useState } from "react";
import { api, mutation, explain, minutes, money } from "@/lib/api";
import type {
  PlanCatalog,
  BillingSummary,
  ManualRequest,
} from "@/lib/contracts";
import { PageTitle, ErrorNotice, Saved } from "@/components/common";
import {
  parseCheckoutReturn,
  verifiedPaymentReturn,
  type BillingTransaction,
} from "@/lib/billing-return";
function stripeRedirect(raw: string, portal = false) {
  const url = new URL(raw);
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.hostname !== (portal ? "billing.stripe.com" : "checkout.stripe.com")
  )
    throw Error("Invalid payment destination");
  window.location.assign(url.href);
}
export default function Billing() {
  const summaryRequest = useRef(0);
  const [catalog, setCatalog] = useState<PlanCatalog | null>(null),
    [summary, setSummary] = useState<BillingSummary | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [paymentNotice, setPaymentNotice] = useState(""),
    [paymentRefresh, setPaymentRefresh] = useState(0),
    [canRefreshPayment, setCanRefreshPayment] = useState(false);
  useEffect(() => {
    let live = true;
    api<PlanCatalog>("/v1/public/plans")
      .then((c) => {
        if (live) setCatalog(c);
      })
      .catch((e) => {
        if (live) setError(explain(e));
      });
    const initialSummaryRequest = ++summaryRequest.current;
    api<BillingSummary>("/v1/billing/summary")
      .then((s) => {
        if (live && summaryRequest.current === initialSummaryRequest)
          setSummary(s);
      })
      .catch((e) => {
        if (live) setError(explain(e));
      });
    return () => {
      live = false;
    };
  }, []);
  useEffect(() => {
    const returned = parseCheckoutReturn(window.location.search);
    if (!returned) return;
    let live = true,
      attempts = 0,
      timer: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController();
    setCanRefreshPayment(false);
    setPaymentNotice("Checking your payment status…");
    const check = async () => {
      attempts++;
      try {
        const transaction = await api<BillingTransaction>(
          "/v1/billing/transactions/" + returned.transactionId,
          {
            signal: AbortSignal.any([
              controller.signal,
              AbortSignal.timeout(10000),
            ]),
          },
        );
        const result = verifiedPaymentReturn(
          transaction,
          returned.transactionId,
        );
        if (!live) return;
        setPaymentNotice(result.message);
        if (result.paid) {
          const latestSummaryRequest = ++summaryRequest.current;
          const latest = await api<BillingSummary>("/v1/billing/summary", {
            signal: AbortSignal.any([
              controller.signal,
              AbortSignal.timeout(10000),
            ]),
          });
          if (live && summaryRequest.current === latestSummaryRequest)
            setSummary(latest);
        }
        if (result.terminal) return;
        if (attempts < 12) timer = setTimeout(() => void check(), 5000);
        else setCanRefreshPayment(true);
      } catch (e) {
        if (!live) return;
        setPaymentNotice(
          "Payment status is unavailable. Check again before starting another payment.",
        );
        setCanRefreshPayment(true);
        setError(explain(e));
      }
    };
    void check();
    return () => {
      live = false;
      controller.abort();
      clearTimeout(timer);
    };
  }, [paymentRefresh]);
  async function checkout(planId: string) {
    setBusy(true);
    setError("");
    try {
      const r = await api<{ url: string }>(
        "/v1/billing/stripe/checkout",
        mutation("POST", { planId }, crypto.randomUUID()),
      );
      stripeRedirect(r.url);
    } catch (e) {
      setError(explain(e));
      setBusy(false);
    }
  }
  async function portal() {
    setBusy(true);
    setError("");
    try {
      const r = await api<{ url: string }>(
        "/v1/billing/stripe/portal",
        mutation("POST", {}, crypto.randomUUID()),
      );
      stripeRedirect(r.url, true);
    } catch (e) {
      setError(explain(e));
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <PageTitle
        title="Plan & minutes"
        description="Pay in PKR. Audio and video use the same minute allowance."
      />
      {error && <ErrorNotice message={error} />}{" "}
      {paymentNotice && (
        <div className="notice" role="status">
          <p>{paymentNotice}</p>
          {canRefreshPayment && (
            <button
              className="text-button"
              onClick={() => {
                setError("");
                setPaymentRefresh((value) => value + 1);
              }}
            >
              Check payment status
            </button>
          )}
        </div>
      )}
      {summary && (
        <section className="usage-panel">
          <div>
            <h2>{summary.usage.plan.name} plan</h2>
            <p>
              <span className="usage-number">
                {minutes(summary.usage.remaining)}
              </span>{" "}
              minutes remaining
            </p>
            <progress
              aria-label="Minutes used or reserved"
              max={summary.usage.allowance}
              value={summary.usage.consumed + summary.usage.reserved}
            />
          </div>
          <div>
            <p>
              {minutes(summary.usage.consumed)} minutes used.{" "}
              {minutes(summary.usage.reserved)} minutes reserved for active
              jobs.
            </p>
            {summary.usage.period.endsAt && (
              <p>
                Current period ends{" "}
                {new Date(summary.usage.period.endsAt).toLocaleDateString(
                  "en-PK",
                )}
                .
              </p>
            )}
            {summary.providers.stripe.checkoutAvailable && (
              <button className="text-button" disabled={busy} onClick={portal}>
                Manage card subscription
              </button>
            )}
          </div>
        </section>
      )}
      <div className="plans">
        {catalog?.plans.map((p) => (
          <article
            key={p.id}
            className={
              "plan " + (summary?.usage.plan.id === p.id ? "current" : "")
            }
          >
            <h2>{p.name}</h2>
            <p className="plan-price">{money(p.price.amountMinor)}</p>
            <small>
              {p.renewal === "monthly"
                ? "per month"
                : "one-time free allowance"}
            </small>
            <ul>
              <li>{minutes(p.includedSeconds)} minutes included</li>
              <li>Up to {p.maxRenderHeight}p video</li>
              <li>{p.sourceRetentionDays}-day media retention</li>
              <li>
                {p.watermark ? "Watermarked videos" : "No video watermark"}
              </li>
            </ul>
            {summary?.usage.plan.id === p.id ? (
              <p className="plan-status">Current plan</p>
            ) : (
              p.slug !== "free" &&
              summary &&
              (p.checkoutAvailable &&
              summary.providers.stripe.checkoutAvailable ? (
                <button disabled={busy} onClick={() => checkout(p.id)}>
                  Choose {p.name}
                </button>
              ) : catalog.providers.manual.checkoutAvailable ? (
                <a className="text-button plan-status" href="#manual-payment">
                  Manual payment options
                </a>
              ) : (
                <p className="plan-status">Checkout unavailable</p>
              ))
            )}
          </article>
        ))}
      </div>
      {!catalog && !error && (
        <p role="status" className="loading">
          Loading plans…
        </p>
      )}
      <p className="billing-note">
        Monthly card subscriptions renew automatically. Manual payments cover
        one term and activate after verification. Unused minutes do not roll
        over.
      </p>
      {catalog && !catalog.providers.manual.checkoutAvailable && (
        <p className="notice">
          Manual payments are not available yet. Payment details will appear
          here once configured.
        </p>
      )}
      {catalog?.providers.manual.checkoutAvailable && (
        <ManualPayment catalog={catalog} />
      )}
      <p className="billing-note">
        Your plan’s retention period controls automatic media deletion. Download
        your files before they expire.
      </p>
    </div>
  );
}
function ManualPayment({ catalog }: { catalog: PlanCatalog }) {
  const [planId, setPlanId] = useState(""),
    [method, setMethod] = useState(""),
    [request, setRequest] = useState<ManualRequest | null>(null),
    [reference, setReference] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const methods = Object.entries(catalog.providers.manual.methods)
    .filter(
      ([, v]) =>
        !!v &&
        typeof v === "object" &&
        "checkoutAvailable" in v &&
        v.checkoutAvailable,
    )
    .map(([k]) => k);
  const names: Record<string, string> = {
    jazzcash: "JazzCash",
    easypaisa: "Easypaisa",
    bank_transfer: "Bank transfer",
    sadapay: "SadaPay",
    nayapay: "NayaPay",
  };
  async function create() {
    setBusy(true);
    setError("");
    try {
      setRequest(
        await api<ManualRequest>(
          "/v1/billing/manual/requests",
          mutation("POST", { planId, method }, crypto.randomUUID()),
        ),
      );
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  async function submit() {
    if (!request) return;
    setBusy(true);
    setError("");
    try {
      setRequest(
        await api<ManualRequest>(
          `/v1/billing/manual/requests/${request.transactionId}/submit`,
          mutation(
            "POST",
            { claimedReference: reference },
            crypto.randomUUID(),
          ),
        ),
      );
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  async function refresh() {
    if (!request) return;
    setBusy(true);
    try {
      setRequest(
        await api<ManualRequest>(
          "/v1/billing/manual/requests/" + request.transactionId,
        ),
      );
    } catch (e) {
      setError(explain(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="settings-panel" id="manual-payment" tabIndex={-1}>
      <h2>Pay manually</h2>
      <p className="billing-note">
        One month at a time. Your plan is activated after your payment is
        verified.
      </p>
      {error && <ErrorNotice message={error} />}{" "}
      {!request ? (
        <>
          <label className="field">
            Monthly plan
            <select value={planId} onChange={(e) => setPlanId(e.target.value)}>
              <option value="">Choose a plan</option>
              {catalog.plans
                .filter((p) => p.slug !== "free")
                .map((p) => (
                  <option value={p.id} key={p.id}>
                    {p.name} — {money(p.price.amountMinor)}
                  </option>
                ))}
            </select>
          </label>
          <label className="field">
            Payment method
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="">Choose a method</option>
              {methods.map((m) => (
                <option key={m} value={m}>
                  {names[m] ?? m}
                </option>
              ))}
            </select>
          </label>
          <button disabled={!planId || !method || busy} onClick={create}>
            Get payment instructions
          </button>
        </>
      ) : (
        <>
          <p className="billing-note">
            Amount due: <strong>{money(request.amountMinor)}</strong>
          </p>
          <dl className="payment-details">
            <dt>Account title</dt>
            <dd>{request.destination.accountTitle}</dd>
            <dt>Account number</dt>
            <dd>{request.destination.accountNumber}</dd>
            {request.destination.bankName && (
              <>
                <dt>Bank</dt>
                <dd>{request.destination.bankName}</dd>
              </>
            )}
          </dl>
          {request.destination.instructions && (
            <p className="notice">{request.destination.instructions}</p>
          )}
          <p className="billing-note">
            Payment status: {request.status.replaceAll("_", " ")}
          </p>
          {request.status === "requested" ? (
            <>
              <label className="field">
                Your payment reference
                <input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  maxLength={128}
                  pattern="[A-Za-z0-9 .:/_-]+"
                />
              </label>
              <button disabled={busy || !reference.trim()} onClick={submit}>
                I have paid — submit for verification
              </button>
            </>
          ) : request.status === "approved" ? (
            <Saved>
              Payment approved. Refresh this page to view your plan.
            </Saved>
          ) : (
            <button disabled={busy} className="secondary" onClick={refresh}>
              Check payment status
            </button>
          )}
        </>
      )}
    </section>
  );
}
