import type { Metadata } from "next";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = { title: "Newsletter", description: "Newsletter quincenal sobre IA, developers y creación de productos." };

export default function NewsletterPage() { return <>
<section className="relative overflow-hidden bg-[#101827] py-16 text-white sm:py-24 lg:py-28">
    <div className="grid-lines absolute inset-0 opacity-50" />
    <div className="container-page relative grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div>
            <p className="eyebrow text-teal-400!">Newsletter TechFoundersLab</p>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-black leading-[.98] tracking-[-.055em] sm:text-6xl">Una pausa para pensar más allá del código.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Cada semana: una idea de fondo, aprendizajes prácticos y herramientas para navegar la transformación tecnológica con criterio.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 text-[#101827] shadow-2xl sm:p-9">
            <p className="eyebrow">Cada semana</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Recíbelo en tu correo.</h2>
            <p className="mt-4 leading-7 text-slate-600">Ideas, aprendizajes y herramientas sobre IA, tecnología y creación de productos, directo en tu correo.</p>
            <NewsletterForm />
        </div>
    </div>
</section>
<section className="py-20 sm:py-28">
    <div className="container-page grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div>
            <p className="eyebrow">Qué encontrarás</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Menos ruido. Más preguntas útiles.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">{[["01","IA y profesión","Qué cambia de verdad en el trabajo de quienes construimos software."],["02","De Dev a Founder","Cómo evaluar si una idea merece tiempo, conversaciones y experimentos."],["03","Construcción práctica","Herramientas, prototipos y decisiones para crear valor, no solo demos."]].map(([n,t,d]) => <div key={n} className="border-t-2 border-blue-600 pt-5"><span className="font-mono text-xs text-blue-600">/{n}</span><h3 className="mt-4 text-lg font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d}</p></div>)}</div>
    </div>
</section></>; }
