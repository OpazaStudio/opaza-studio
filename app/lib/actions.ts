"use server";

import { Resend } from "resend";
import { isLocale, type Lang } from "./copy";
import { SITE_NAME } from "./site";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "project" | "form", string>>;
};

export const INITIAL_CONTACT_STATE: ContactState = { status: "idle" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MESSAGES = {
  fr: {
    name: "Nom requis.",
    email: "Email invalide.",
    project: "Décrivez brièvement votre projet.",
    form: "Une erreur est survenue. Réessayez.",
  },
  en: {
    name: "Name is required.",
    email: "Invalid email.",
    project: "Briefly describe your project.",
    form: "Something went wrong. Please retry.",
  },
} satisfies Record<Lang, Record<"name" | "email" | "project" | "form", string>>;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(input: {
  name: string;
  email: string;
  project: string;
  budget: string | null;
  lang: Lang;
}) {
  const e = (s: string) => escapeHtml(s);
  const isFr = input.lang === "fr";
  const subject = isFr
    ? `Nouveau message — ${input.name}`
    : `New message — ${input.name}`;
  const labels = isFr
    ? { name: "Nom", email: "Email", project: "Projet", budget: "Budget", lang: "Langue" }
    : { name: "Name", email: "Email", project: "Project", budget: "Budget", lang: "Language" };

  const text = [
    `${labels.name}: ${input.name}`,
    `${labels.email}: ${input.email}`,
    `${labels.budget}: ${input.budget ?? "—"}`,
    `${labels.lang}: ${input.lang}`,
    "",
    `${labels.project}:`,
    input.project,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:560px;color:#3D2517">
      <p style="margin:0 0 8px"><strong>${e(labels.name)}:</strong> ${e(input.name)}</p>
      <p style="margin:0 0 8px"><strong>${e(labels.email)}:</strong>
        <a href="mailto:${e(input.email)}">${e(input.email)}</a>
      </p>
      <p style="margin:0 0 8px"><strong>${e(labels.budget)}:</strong> ${e(input.budget ?? "—")}</p>
      <p style="margin:0 0 16px"><strong>${e(labels.lang)}:</strong> ${e(input.lang)}</p>
      <hr style="border:0;border-top:1px solid #E0D5BF;margin:16px 0">
      <p style="margin:0 0 8px"><strong>${e(labels.project)}:</strong></p>
      <p style="margin:0;white-space:pre-wrap;line-height:1.55">${e(input.project)}</p>
    </div>
  `;

  return { subject, text, html };
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const rawLang = String(formData.get("lang") ?? "fr");
  const lang: Lang = isLocale(rawLang) ? rawLang : "fr";
  const m = MESSAGES[lang];

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const project = String(formData.get("project") ?? "").trim();
  const budget = String(formData.get("budget") ?? "").trim() || null;

  const errors: ContactState["errors"] = {};
  if (!name) errors.name = m.name;
  if (!EMAIL_RE.test(email)) errors.email = m.email;
  if (!project) errors.project = m.project;

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.warn(
      "[contact] Missing RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL — logging only."
    );
    console.log("[contact]", { name, email, project, budget, lang });
    return { status: "success" };
  }

  try {
    const resend = new Resend(apiKey);
    const { subject, text, html } = buildEmail({ name, email, project, budget, lang });

    const result = await resend.emails.send({
      from: `${SITE_NAME} <${from}>`,
      to: [to],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("[contact] Resend error:", result.error);
      return { status: "error", errors: { form: m.form } };
    }
  } catch (err) {
    console.error("[contact] sendContact failed:", err);
    return { status: "error", errors: { form: m.form } };
  }

  return { status: "success" };
}
