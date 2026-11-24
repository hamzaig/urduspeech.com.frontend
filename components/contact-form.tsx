"use client";
import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { api, explain, mutation } from "@/lib/api";
import { ErrorNotice } from "@/components/common";

const TOPICS = [
  "Upload, transcription, or render issue",
  "Payment or plan question",
  "Privacy or account deletion",
  "Something else",
] as const;
const MESSAGE_MAX = 4000;

type Fields = { name: string; email: string; topic: string; message: string };

/** Public support form. Messages are stored for the owner's admin inbox; no email is sent. */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    topic: TOPICS[0],
    message: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const set =
    (key: keyof Fields) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setFields((current) => ({ ...current, [key]: event.target.value }));

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setError("");
    setState("sending");
    // Bots fill the hidden field; the API accepts and discards those silently.
    const website = String(
      new FormData(event.currentTarget).get("website") ?? "",
    );
    try {
      await api(
        "/v1/public/contact",
        mutation("POST", {
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.topic,
          message: fields.message.trim(),
          ...(website ? { website } : {}),
        }),
      );
      setState("sent");
    } catch (failure) {
      // Keep every typed value so the visitor can simply retry.
      setError(explain(failure));
      setState("idle");
    }
  }

  if (state === "sent")
    return (
      <div className="contact-form contact-sent" role="status">
        <CheckCircle2 size={28} aria-hidden="true" />
        <h2>Message received</h2>
        <p>
          Thanks, {fields.name.trim() || "there"}. We will reply to{" "}
          <strong>{fields.email.trim()}</strong>.
        </p>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            setFields((current) => ({ ...current, message: "" }));
            setState("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title">Send us a message</h2>
      {error && <ErrorNotice message={error} />}
      <div className="contact-form-row">
        <div className="field">
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={fields.name}
            onChange={set("name")}
          />
        </div>
        <div className="field">
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={254}
            value={fields.email}
            onChange={set("email")}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="contact-topic">Topic</label>
        <select
          id="contact-topic"
          name="topic"
          value={fields.topic}
          onChange={set("topic")}
        >
          {TOPICS.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={MESSAGE_MAX}
          aria-describedby="contact-message-help"
          value={fields.message}
          onChange={set("message")}
        />
        <small id="contact-message-help" className="contact-message-help">
          <span>
            Include your project ID or payment reference if you have one. Never
            share a card number, PIN, OTP, or password.
          </span>
          <span aria-live="polite">
            {fields.message.length.toLocaleString("en-PK")}/
            {MESSAGE_MAX.toLocaleString("en-PK")}
          </span>
        </small>
      </div>
      {/* Honeypot: hidden from people and assistive technology. */}
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <button type="submit" disabled={state === "sending"}>
        <Send size={17} aria-hidden="true" />
        {state === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
