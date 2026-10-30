export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="bg-[#101827] py-20 text-white sm:py-28">
    <div className="container-page"><p className="eyebrow text-teal-400!">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[.98] tracking-[-.055em] sm:text-7xl">{title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">{text}</p></div>
  </section>;
}
