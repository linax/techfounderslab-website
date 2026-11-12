import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return <footer className="bg-[#101827] py-14 text-white">
    <div className="container-page grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><div className="text-xl font-black">TechFounders<span className="text-blue-400">Lab</span></div><p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">{site.tagline} Una plataforma editorial de Carolina Lagos.</p></div>
      <div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Explora</p><div className="mt-4 grid gap-3 text-sm"><Link href="/videos">Videos</Link><Link href="/newsletter">Newsletter</Link></div></div>
      <div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">TechFoundersLab</p><div className="mt-4 grid gap-3 text-sm"><Link href="/sobre-mi">Sobre mí</Link><Link href="/colaboraciones">Colaboraciones</Link><Link href="/privacidad">Privacidad</Link></div></div>
    </div>
    <div className="container-page mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">© {new Date().getFullYear()} TechFoundersLab. Contenido con criterio, sin promesas fáciles.</div>
  </footer>;
}
