import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jugamos en Serio | Team Building Corporativo en Colombia",
  description:
    "Diseñamos experiencias gamificadas que transforman equipos corporativos. Team building, retiros y dinámicas para empresas en Colombia y LATAM.",
  keywords: ["team building Colombia", "actividades de integración para empresas", "gamificación corporativa", "experiencias lúdicas equipos"],
  openGraph: {
    title: "Jugamos en Serio | Team Building Corporativo en Colombia",
    description: "Diseñamos experiencias gamificadas que transforman equipos corporativos.",
    url: "https://jugamosenserio.com",
    siteName: "Jugamos en Serio",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jugamos en Serio",
    description: "Diseñamos experiencias gamificadas que transforman equipos corporativos.",
  },
  alternates: {
    canonical: "https://jugamosenserio.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  );
}
