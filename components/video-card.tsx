import Image from "next/image";
import type { Video } from "@/content/site";
import { Play } from "./icons";

const dateFormatter = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" });

export function VideoCard({ video, priority = false }: { video: Video; priority?: boolean }) {
  if (!video.youtubeUrl || !video.thumbnailUrl) return null;
  return <article className="card-lift overflow-hidden rounded-2xl border border-slate-200 bg-white"><a href={video.youtubeUrl} target="_blank" rel="noreferrer" className="group block" aria-label={`Ver en YouTube: ${video.title}`}><div className="relative aspect-video overflow-hidden bg-slate-200"><Image src={video.thumbnailUrl} alt="" fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" /><span className="absolute inset-0 grid place-items-center bg-black/10 transition group-hover:bg-black/20"><span className="grid h-14 w-14 place-items-center rounded-full bg-blue-600 text-white shadow-lg"><Play className="h-7 w-7" /></span></span></div><div className="p-6">{video.publishedAt && <time className="text-xs font-bold uppercase tracking-wider text-blue-600" dateTime={video.publishedAt}>{dateFormatter.format(new Date(video.publishedAt))}</time>}<h3 className="mt-2 text-xl font-black leading-7 tracking-tight">{video.title}</h3>{video.description && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{video.description}</p>}</div></a></article>;
}
