"use client";

import { useMemo, useState } from "react";
import { PageHero } from "@/components/page-hero";
import { videoCategories, videos } from "@/content/site";

export default function VideosPage() {
  const [category, setCategory] = useState("Todas"); const [query, setQuery] = useState("");
  const visible = useMemo(() => videos.filter(v => (category === "Todas" || v.category === category) && `${v.title} ${v.description}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <><PageHero eyebrow="Biblioteca" title="Videos para pensar y construir con más criterio." text="IA, carrera, innovación y emprendimiento explicados desde la experiencia técnica, sin atajos ni sensacionalismo." /><section className="py-16 sm:py-24"><div className="container-page"><div className="grid gap-4 rounded-2xl bg-[#f4f6f8] p-5 md:grid-cols-[1fr_1fr]"><div><label className="text-sm font-bold" htmlFor="buscar">Buscar videos</label><input id="buscar" value={query} onChange={e => setQuery(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4" placeholder="Buscar por tema..." /></div><div><label className="text-sm font-bold" htmlFor="categoria">Filtrar por categoría</label><select id="categoria" value={category} onChange={e => setCategory(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4"><option>Todas</option>{videoCategories.map(c => <option key={c}>{c}</option>)}</select></div></div>{visible.length ? <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map(v => <article key={v.id}>{v.title}</article>)}</div> : <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center"><h2 className="text-2xl font-black">Aún no hay videos configurados</h2><p className="mt-3 text-slate-600">Cuando se añadan enlaces reales al archivo de contenido aparecerán aquí, listos para buscar y filtrar.</p></div>}</div></section></>;
}
