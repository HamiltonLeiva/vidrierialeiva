import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vidrierialeiva.com"),
  title: {
    default: "Vidriería Leiva | Soluciones en Vidrio y Aluminio en Nicaragua",
    template: "%s | Vidriería Leiva",
  },
  description:
    "Especialistas en fabricación e instalación de ventanas de aluminio, puertas de vidrio templado, mamparas para baño, fachadas y barandales en Nicaragua. Calidad profesional y garantía garantizada.",
  keywords: [
    "vidriería nicaragua",
    "ventanas de aluminio managua",
    "puertas de vidrio templado",
    "mamparas para baño",
    "fachadas de vidrio managua",
    "vidriería leiva",
    "vidrio y aluminio nicaragua",
  ],
  authors: [{ name: "Vidriería Leiva" }],
  openGraph: {
    title: "Vidriería Leiva | Soluciones en Vidrio y Aluminio en Nicaragua",
    description:
      "Fabricación e instalación de soluciones arquitectónicas en vidrio y aluminio. Calidad profesional y garantía garantizada.",
    url: "https://www.vidrierialeiva.com",
    siteName: "Vidriería Leiva",
    images: [
      {
        url: "/images/hero_vidrieria_leiva.jpg",
        width: 1200,
        height: 630,
        alt: "Vidriería Leiva Nicaragua",
      },
    ],
    locale: "es_NI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidriería Leiva | Soluciones en Vidrio y Aluminio en Nicaragua",
    description:
      "Fabricación e instalación de ventanas, puertas, mamparas y fachadas en Nicaragua.",
    images: ["/images/hero_vidrieria_leiva.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Vidriería Leiva",
  image: "https://www.vidrierialeiva.com/images/hero_vidrieria_leiva.jpg",
  url: "https://www.vidrierialeiva.com",
  telephone: "+50588888888",
  email: "info@vidrierialeiva.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Managua",
    addressLocality: "Managua",
    addressCountry: "NI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.1364,
    longitude: -86.2514,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "12:30",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "NIO, USD",
  paymentAccepted: "Cash, Credit Card, Transfer",
  areaServed: {
    "@type": "Country",
    name: "Nicaragua",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Instalación de Ventanas de Aluminio",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Puertas de Vidrio Templado",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Mamparas para Baño",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Fachadas Comerciales y Muro Cortina",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-leiva-surface text-gray-800">
        <TopBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
