import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { VideoLibrary } from "@/components/video-library";
import { getYouTubeVideos } from "@/lib/youtube";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Videos", description: "Videos de TechFoundersLab sobre IA, carrera, productos y emprendimiento tecnológico." };

export default async function VideosPage() {
  const videos = await getYouTubeVideos();
  return <><PageHero eyebrow="Canal de YouTube" title="Videos para pensar y construir con más criterio." text="IA, carrera, innovación y emprendimiento explicados desde la experiencia técnica, sin atajos ni sensacionalismo." /><section className="py-16 sm:py-24"><div className="container-page"><div className="mb-8 flex flex-wrap items-center justify-between gap-4"><p className="text-sm text-slate-600">Los últimos videos publicados en TechFoundersLab.</p><a className="font-bold text-blue-600 hover:underline" href={site.youtubeUrl} target="_blank" rel="noreferrer">Visitar el canal ↗</a></div><VideoLibrary videos={videos} /></div></section></>;
}
