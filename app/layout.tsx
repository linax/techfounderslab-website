import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://techfounderslab.example"),
  title: { default: "TechFoundersLab — Del código a la creación de oportunidades", template: "%s | TechFoundersLab" },
  description: "IA, futuro del desarrollo de software, innovación y el camino de Dev a Founder con Carolina Lagos.",
  openGraph: { type: "website", locale: "es_CL", siteName: "TechFoundersLab" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body><a href="#contenido" className="sr-only z-[100] bg-white p-3 focus:not-sr-only focus:fixed focus:left-3 focus:top-3">Saltar al contenido</a><Header /><main id="contenido">{children}</main><Footer /></body></html>;
}
