"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  INITIAL_CONTACT_STATE,
  sendContact,
  type ContactState,
} from "../lib/actions";
import type { Copy, Lang } from "../lib/copy";

export function ContactForm({
  copy,
  lang,
}: {
  copy: Copy["contact"];
  lang: Lang;
}) {
  const [state, formAction] = useActionState<ContactState, FormData>(
    sendContact,
    INITIAL_CONTACT_STATE
  );

  return (
    <form className="contact-form reveal" action={formAction} noValidate>
      <input type="hidden" name="lang" value={lang} />
      <h3 className="h3 contact-form-title">{copy.orForm}</h3>

      <label className="field">
        <span className="mono field-label">{copy.form.name}</span>
        <input type="text" name="name" required aria-invalid={!!state.errors?.name} />
        {state.errors?.name && <span className="field-error">{state.errors.name}</span>}
      </label>

      <label className="field">
        <span className="mono field-label">{copy.form.email}</span>
        <input type="email" name="email" required aria-invalid={!!state.errors?.email} />
        {state.errors?.email && <span className="field-error">{state.errors.email}</span>}
      </label>

      <label className="field">
        <span className="mono field-label">{copy.form.project}</span>
        <textarea name="project" rows={4} required aria-invalid={!!state.errors?.project} />
        {state.errors?.project && <span className="field-error">{state.errors.project}</span>}
      </label>

      <fieldset className="field">
        <legend className="mono field-label">{copy.form.budget}</legend>
        <div className="budget-chips">
          {copy.form.budgets.map((b) => (
            <label key={b} className="chip">
              <input type="radio" name="budget" value={b} />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <SubmitButton
        sentLabel={lang === "fr" ? "Merci !" : "Thanks!"}
        sendingLabel={lang === "fr" ? "Envoi…" : "Sending…"}
        defaultLabel={copy.form.send}
        sent={state.status === "success"}
      />

      {state.errors?.form && (
        <p className="field-error" role="alert">{state.errors.form}</p>
      )}
    </form>
  );
}

function SubmitButton({
  sent,
  defaultLabel,
  sendingLabel,
  sentLabel,
}: {
  sent: boolean;
  defaultLabel: string;
  sendingLabel: string;
  sentLabel: string;
}) {
  const { pending } = useFormStatus();
  const label = pending ? sendingLabel : sent ? sentLabel : defaultLabel;
  return (
    <button type="submit" className="btn contact-send" disabled={pending}>
      <span className="dot" />
      {label}
      <span style={{ marginLeft: "0.4rem" }}>→</span>
    </button>
  );
}
