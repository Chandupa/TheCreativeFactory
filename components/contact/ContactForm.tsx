"use client";

import { useState, type FormEvent } from "react";
import { contactInfo } from "@/data/site";
import type { ContactFormData } from "@/types/contact";

function readForm(form: HTMLFormElement): ContactFormData {
  const data = new FormData(form);
  const text = (key: keyof ContactFormData) => String(data.get(key) ?? "").trim();
  return {
    name: text("name"),
    email: text("email"),
    phone: text("phone") || undefined,
    company: text("company") || undefined,
    message: text("message"),
  };
}

function toMailto({ name, email, phone, company, message }: ContactFormData): string {
  const lines = [
    message,
    "",
    "—",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    company ? `Company: ${company}` : null,
  ].filter((line): line is string => line !== null);

  const params = new URLSearchParams({ subject: `Website inquiry from ${name}`, body: lines.join("\n") });
  return `mailto:${contactInfo.email}?${params.toString().replace(/\+/g, "%20")}`;
}

/**
 * UI-only for this migration phase. There is no backend yet (Supabase + a
 * Server Action come later), so submitting hands the message to the visitor's
 * email app instead of pretending it was stored.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    window.location.href = toMailto(readForm(form));
    setStatus(
      `Your email app should open with your message ready to send. If nothing happened, email us directly at ${contactInfo.email}.`,
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="contact-grid">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">
            Phone <span className="optional">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+94 ..." />
        </div>
        <div className="form-field">
          <label htmlFor="company">
            Company <span className="optional">(optional)</span>
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Company name" />
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required placeholder="Tell us about your project" />
        </div>
      </div>

      <button type="submit" className="btn btn--primary">
        SEND MESSAGE
      </button>

      {status ? (
        <p className="form-status" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
