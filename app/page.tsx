import Link from "next/link";
import Image from "next/image";
import { Arrow, Play } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { VideoCard } from "@/components/video-card";
import { books, themes } from "@/content/site";
import { getYouTubeVideos } from "@/lib/youtube";

export default async function Home() {
  const videos = await getYouTubeVideos();
  return <>
    <section className="relative overflow-hidden bg-[#101827] text-white">
      <div className="grid-lines absolute inset-0 opacity-50" />
      <div className="container-page relative grid min-h-[760px] items-center gap-14 py-20 lg:grid-cols-[1.35fr_.65fr]">
        <div><p className="eyebrow text-teal-400!">Tecnología · IA · Emprendimiento</p><h1 className="display mt-6 max-w-5xl text-balance">Tu carrera de tecnología va más allá del <span className="text-blue-400">código.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">Exploramos cómo la inteligencia artificial está transformando nuestra profesión y cómo convertir nuestras habilidades tecnológicas en nuevas oportunidades, productos y negocios.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-bold hover:bg-blue-500" href="/videos"><Play className="h-5 w-5" /> Explorar videos</Link><Link className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 font-bold hover:bg-white/10" href="/newsletter">Suscribirme a la newsletter</Link></div></div>
        <div className="relative hidden lg:block"><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900">
        <Image src="/images/clagos.jpeg" alt="Carolina Lagos, ingeniera de software y creadora de TechFoundersLab" fill priority sizes="34vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-[#101827]/25" />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-300">Carolina Lagos</p>
        <p className="mt-2 text-2xl font-black leading-tight">Ing. de Software · Mg. en innovación<br />Creadora de TechFoundersLab</p>
        </div>
        </div>
       
        </div>
      </div>
    </section>

    <section className="py-24 sm:py-32"><div className="container-page"><div className="grid gap-8 lg:grid-cols-2"><div><p className="eyebrow">Lo que estamos mirando</p><h2 className="section-title mt-4 text-balance">Tres conversaciones que ya están cambiando nuestra profesión.</h2></div><p className="max-w-xl self-end text-lg leading-8 text-slate-600">Sin futurismo vacío. Analizamos el cambio desde la práctica: qué aprender, qué cuestionar y qué oportunidades vale la pena explorar.</p></div><div className="mt-14 grid gap-5 md:grid-cols-3">{themes.map((theme) => <Link href={theme.href} key={theme.number} className="card-lift group flex min-h-72 flex-col rounded-2xl border border-slate-200 p-7"><span className="font-mono text-sm text-blue-600">/{theme.number}</span><h3 className="mt-14 text-2xl font-black tracking-tight">{theme.title}</h3><p className="mt-4 leading-7 text-slate-600">{theme.text}</p><Arrow className="mt-auto h-6 w-6 transition-transform group-hover:translate-x-1" /></Link>)}</div></div></section>

    <section className="bg-[#f4f6f8] py-24 sm:py-32"><div className="container-page"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow">Videos destacados</p><h2 className="section-title mt-4">Ideas que vale la pena explorar.</h2></div><Link className="inline-flex items-center gap-2 font-bold text-blue-600" href="/videos">Ver biblioteca <Arrow className="h-5 w-5" /></Link></div>{videos.length ? <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{videos.slice(0, 6).map((video, index) => <VideoCard key={video.id} video={video} priority={index < 3} />)}</div> : <div className="mt-12 grid min-h-96 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center"><div className="max-w-lg"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-50 text-blue-600"><Play className="h-7 w-7" /></div><h3 className="mt-6 text-2xl font-black">No pudimos cargar los videos</h3><p className="mt-3 leading-7 text-slate-600">Puedes visitar el canal directamente mientras recuperamos la conexión con YouTube.</p><a href="https://www.youtube.com/@TechFoundersLab" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-bold text-blue-600">Ir al canal <Arrow className="h-5 w-5" /></a></div></div>}</div></section>

    <section className="bg-blue-600 py-24 text-white sm:py-28"><div className="container-page grid gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow text-blue-200!">Newsletter quincenal</p><h2 className="section-title mt-4 text-balance">Ideas para ir más allá del código.</h2></div><div><p className="max-w-xl text-lg leading-8 text-blue-100">Una newsletter sobre IA, el futuro de los developers y el camino de crear productos y negocios propios. Reflexiones, experiencias y herramientas que no siempre caben en un video.</p><NewsletterForm dark /></div></div></section>

    <section className="py-24 sm:py-32"><div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center"><div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#101827]"><Image src="/images/clagos.jpeg" alt="Carolina Lagos, creadora de TechFoundersLab" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /><div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/65 to-transparent p-8"><span className="eyebrow text-white!">La persona detrás del laboratorio</span></div></div><div><p className="eyebrow">Sobre la creadora</p><h2 className="section-title mt-4">Carolina Lagos</h2><p className="mt-7 text-lg leading-8 text-slate-600">Ingeniera de software, emprendedora y creadora de TechFoundersLab. Este espacio reúne su experiencia en desarrollo, innovación y creación de productos con los aprendizajes —incluidos los incómodos— que deja emprender en el mundo real.</p><Link className="mt-8 inline-flex items-center gap-2 font-bold text-blue-600" href="/sobre-mi">Conocer la historia <Arrow className="h-5 w-5" /></Link></div></div></section>

    <section className="border-y border-slate-200 bg-[#f4f6f8] py-24"><div className="container-page grid gap-10 lg:grid-cols-[1fr_1.1fr]"><div><p className="eyebrow">Libros</p><h2 className="section-title mt-4">Del aprendizaje a la experimentación.</h2></div><div className="rounded-3xl bg-white p-8 shadow-sm sm:p-10"><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">Próximamente · título provisional</span><h3 className="mt-6 text-3xl font-black tracking-tight">{books[0].title}</h3><p className="mt-4 leading-7 text-slate-600">{books[0].description}</p><Link className="mt-7 inline-flex items-center gap-2 font-bold text-blue-600" href="/libros">Conocer el proyecto <Arrow className="h-5 w-5" /></Link></div></div></section>

    <section className="py-24"><div className="container-page rounded-3xl bg-[#101827] px-7 py-14 text-white sm:px-14"><div className="grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-teal-400!">Colaboremos</p><h2 className="mt-4 max-w-3xl text-balance text-4xl font-black tracking-tight sm:text-5xl">¿Tu marca, comunidad o evento quiere conversar con profesionales tecnológicos?</h2><p className="mt-5 max-w-2xl leading-7 text-slate-300">Exploremos entrevistas, podcasts, eventos, patrocinios o colaboraciones editoriales con sentido.</p></div><Link className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-white px-6 font-bold text-[#101827]" href="/colaboraciones">Proponer una colaboración <Arrow className="h-5 w-5" /></Link></div></div></section>
  </>;
}
