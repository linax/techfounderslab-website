"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("El formulario estará disponible cuando se configure el proveedor de newsletter. No hemos guardado tu email.");
  }
  return <form onSubmit={submit} className="mt-7 max-w-xl" aria-describedby="newsletter-note newsletter-status">
    <div className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="newsletter-email">Correo electrónico</label>
      <input id="newsletter-email" name="email" type="email" autoComplete="email" required placeholder="tu@email.com" className={`min-h-13 flex-1 rounded-xl border px-4 ${dark ? "border-white/20 bg-white/10 text-white placeholder:text-slate-400" : "border-slate-300 bg-white"}`} />
      <button className="min-h-13 rounded-xl bg-blue-600 px-6 font-bold text-white hover:bg-blue-700" type="submit">Quiero recibirla</button>
    </div>
    <label className={`mt-4 flex items-start gap-3 text-xs leading-5 ${dark ? "text-slate-400" : "text-slate-600"}`}><input required className="mt-1" type="checkbox" /> Acepto recibir la newsletter y he leído la <LinkInline href="/privacidad">política de privacidad</LinkInline>. Podré darme de baja cuando quiera.</label>
    <p id="newsletter-note" className={`mt-3 text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}>Frecuencia quincenal. Sin ruido ni promesas de éxito fácil.</p>
    {message && <p id="newsletter-status" role="status" className={`mt-4 rounded-lg p-3 text-sm ${dark ? "bg-white/10 text-slate-200" : "bg-amber-50 text-amber-900"}`}>{message}</p>}
  </form>;
}

function LinkInline({ href, children }: { href: string; children: React.ReactNode }) { return <a className="underline hover:no-underline" href={href}>{children}</a>; }
