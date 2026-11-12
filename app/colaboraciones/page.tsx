"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/page-hero";

export default function CollaborationsPage() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/colaboraciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          message: formData.get("message"),
          consent: formData.get("consent") === "on",
        }),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        setStatus(result.error ?? "No pudimos guardar tu solicitud. Inténtalo de nuevo.");
        return;
      }

      form.reset();
      setStatus("Gracias por escribir. Tu propuesta fue enviada correctamente.");
    } catch {
      setStatus("No pudimos conectar con el servidor. Inténtalo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return <><PageHero eyebrow="Colaboraciones" title="Creemos conversaciones que aporten algo." text="Para marcas, comunidades, eventos, medios y creadores que quieran conectar con profesionales tecnológicos interesados en IA, innovación y emprendimiento." /><section className="py-20 sm:py-28"><div className="container-page grid gap-14 lg:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow">Formatos</p><h2 className="mt-4 text-4xl font-black tracking-tight">Distintas formas de construir juntos.</h2><div className="mt-8 grid gap-4">{["Patrocinios editoriales con transparencia","Entrevistas y conversaciones","Participación en eventos y podcasts","Contenido conjunto con otros creadores"].map((x,i)=><div key={x} className="flex gap-4 rounded-xl border border-slate-200 p-5"><span className="font-mono text-sm text-blue-600">0{i+1}</span><p className="font-bold">{x}</p></div>)}</div><div className="mt-10 rounded-2xl bg-[#f4f6f8] p-6"><h3 className="font-black">Media kit</h3><p className="mt-2 text-sm leading-6 text-slate-600">Se publicará cuando existan estadísticas verificadas y materiales definitivos. No mostramos cifras ni colaboraciones ficticias.</p></div></div><form onSubmit={submit} className="rounded-3xl bg-[#101827] p-7 text-white sm:p-10"><h2 className="text-3xl font-black">Cuéntame tu idea</h2><p className="mt-3 text-slate-400">Solo lo necesario para entender si existe un buen encaje editorial.</p><div className="mt-8 grid gap-5"><Field label="Nombre" name="name" /><Field label="Email profesional" name="email" type="email" /><Field label="Organización o proyecto" name="organization" /><label className="grid gap-2 text-sm font-bold">Propuesta<textarea required name="message" rows={5} maxLength={5000} className="rounded-xl border border-white/20 bg-white/10 p-3 font-normal" placeholder="Contexto, formato, fechas y qué esperas lograr." /></label><label className="flex items-start gap-3 text-xs leading-5 text-slate-400"><input required name="consent" type="checkbox" className="mt-1" /> Acepto el tratamiento de mis datos para responder esta solicitud.</label><button disabled={isSubmitting} className="min-h-13 rounded-xl bg-blue-600 px-6 font-bold hover:bg-blue-500 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Enviando…" : "Proponer una colaboración"}</button>{status&&<p role="status" className="rounded-xl bg-white/10 p-4 text-sm text-slate-200">{status}</p>}</div></form></div></section></>;
}

function Field({label,name,type="text"}:{label:string;name:string;type?:string}){return <label className="grid gap-2 text-sm font-bold">{label}<input required name={name} type={type} maxLength={name === "email" ? 254 : 200} autoComplete={name === "name" ? "name" : name === "email" ? "email" : "organization"} className="h-12 rounded-xl border border-white/20 bg-white/10 px-3 font-normal" /></label>}
