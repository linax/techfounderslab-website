"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          consent: formData.get("consent") === "true",
        }),
      });
      const result: unknown = await response.json();
      const body = isRecord(result) ? result : {};

      if (!response.ok) {
        setMessageType("error");
        setMessage(typeof body.error === "string" ? body.error : "No pudimos procesar tu suscripción. Inténtalo de nuevo más tarde.");
        return;
      }

      setMessageType("success");
      setMessage(body.status === "active"
        ? "Tu suscripción está activa. ¡Gracias por sumarte!"
        : "¡Listo! Revisa tu correo y confirma la suscripción para empezar a recibir la newsletter.");
      form.reset();
    } catch {
      setMessageType("error");
      setMessage("No pudimos completar la suscripción. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <form onSubmit={submit} className="mt-7 max-w-xl" aria-describedby="newsletter-note newsletter-status" aria-busy={isSubmitting}>
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">Correo electrónico</label>
      <input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={isSubmitting} placeholder="tu@email.com" className={`min-h-13 flex-1 rounded-xl border px-4 ${dark ? "border-white/20 bg-white/10 text-white placeholder:text-slate-400" : "border-slate-300 bg-white"}`} />
      <button className="min-h-13 rounded-xl bg-blue-600 px-6 font-bold text-white hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? "Enviando..." : "Quiero recibirlo"}</button>
    </div>
    <label className={`mt-4 flex items-start gap-3 text-xs leading-5 ${dark ? "text-slate-400" : "text-slate-600"}`}><input name="consent" value="true" required disabled={isSubmitting} className="mt-1" type="checkbox" /> Acepto recibir la newsletter y he leído la <LinkInline href="/privacidad">política de privacidad</LinkInline>. Podré darme de baja cuando quiera.</label>
    <p id="newsletter-note" className={`mt-3 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>Frecuencia quincenal. Sin ruido ni promesas de éxito fácil.</p>
    {message && <p id="newsletter-status" role={messageType === "error" ? "alert" : "status"} className={`mt-4 rounded-lg p-3 text-sm ${dark ? "bg-white/10 text-slate-200" : messageType === "error" ? "bg-amber-50 text-amber-900" : "bg-emerald-50 text-emerald-900"}`}>{message}</p>}
  </form>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function LinkInline({ href, children }: { href: string; children: React.ReactNode }) { return <a className="underline hover:no-underline" href={href}>{children}</a>; }
