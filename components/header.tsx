"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "./icons";

const links = [
  ["Videos", "/videos"], ["Newsletter", "/newsletter"], ["Libros", "/libros"], ["Sobre mí", "/sobre-mi"], ["Colaboraciones", "/colaboraciones"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
    <div className="container-page flex h-18 items-center justify-between">
      <Link href="/" className="flex items-center gap-2 font-black tracking-[-.03em]" aria-label="TechFoundersLab, inicio">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#101827] text-sm text-white">TF</span>
        <span>TechFounders<span className="text-blue-600">Lab</span></span>
      </Link>
      <nav className="hidden items-center gap-7 text-sm font-semibold md:flex" aria-label="Navegación principal">
        {links.map(([label, href]) => <Link key={href} className="hover:text-blue-600" href={href}>{label}</Link>)}
      </nav>
      <button onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Cerrar menú" : "Abrir menú"}><MenuIcon open={open} /></button>
    </div>
    {open && <nav id="mobile-nav" className="container-page grid gap-1 border-t border-slate-200 py-4 md:hidden" aria-label="Navegación móvil">
      {links.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} className="rounded-lg px-3 py-3 font-semibold hover:bg-slate-100" href={href}>{label}</Link>)}
    </nav>}
  </header>;
}
