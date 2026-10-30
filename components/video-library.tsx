"use client";

import { useMemo, useState } from "react";
import type { Video } from "@/content/site";
import { VideoCard } from "./video-card";

export function VideoLibrary({ videos }: { videos: Video[] }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => videos.filter(video => `${video.title} ${video.description}`.toLowerCase().includes(query.toLowerCase())), [query, videos]);
  return <><div className="rounded-2xl bg-[#f4f6f8] p-5"><label className="text-sm font-bold" htmlFor="buscar">Buscar videos</label><input id="buscar" value={query} onChange={event => setQuery(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-4" placeholder="Buscar por tema..." /></div>{visible.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{visible.map((video, index) => <VideoCard key={video.id} video={video} priority={index < 3} />)}</div> : <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center"><h2 className="text-2xl font-black">No encontramos resultados</h2><p className="mt-3 text-slate-600">Prueba con otro tema o una búsqueda más breve.</p></div>}</>;
}
