export type Video = {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedAt?: string;
  youtubeUrl?: string;
  thumbnailUrl?: string;
  featured?: boolean;
};

export type Book = {
  slug: string;
  title: string;
  status: "proximamente" | "publicado";
  description: string;
  purchaseUrl?: string;
};

export const site = {
  name: "TechFoundersLab",
  tagline: "Del código a la creación de oportunidades.",
  author: "Carolina Lagos",
  email: "",
  youtubeUrl: "",
  parsifalUrl: "",
};

// Añade aquí videos reales. Las tarjetas solo enlazan cuando existe youtubeUrl.
export const videos: Video[] = [];

export const videoCategories = [
  "IA y futuro del software",
  "Carrera y transformación profesional",
  "De Dev a Founder",
  "Innovación, productos y MVPs",
  "Entrevistas y conversaciones",
];

export const books: Book[] = [
  {
    slug: "atrevete-a-experimentar",
    title: "Atrévete a experimentar: De una idea guardada a tu primera conversación con usuarios",
    status: "proximamente",
    description: "Un título de trabajo sobre experimentar, validar ideas y convertir una intuición en conversaciones reales con usuarios.",
  },
];

export const themes = [
  { number: "01", title: "El futuro del developer", text: "IA, ingeniería de software, trabajo, productividad y evolución profesional.", href: "/videos?categoria=IA+y+futuro+del+software" },
  { number: "02", title: "Mentalidad founder", text: "Innovación, validación de ideas, modelos de negocio y creación de oportunidades.", href: "/videos?categoria=De+Dev+a+Founder" },
  { number: "03", title: "Construir con IA", text: "Prototipos, MVPs, agentes y herramientas para desarrollar productos con valor real.", href: "/videos?categoria=Innovación,+productos+y+MVPs" },
];
