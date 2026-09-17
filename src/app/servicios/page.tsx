import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SERVICES = [
  {
    slug: "ventanas-de-aluminio",
    title: "Ventanas de Aluminio",
    subtitle: "Resistencia y diseño para cada espacio",
    image: "/images/ventanas_aluminio_modernas.jpg",
    tag: "Residencial / Comercial",
  },
  {
    slug: "puertas-de-vidrio",
    title: "Puertas de Vidrio",
    subtitle: "Elegancia que conecta ambientes",
    image: "/images/puertas_vidrio_premium.jpg",
    tag: "Premium",
  },
  {
    slug: "mamparas-para-bano",
    title: "Mamparas para Baño",
    subtitle: "Transforma tu ducha en un spa privado",
    image: "/images/shower_glass_enclosure.png",
    tag: "Residencial",
  },
  {
    slug: "fachadas-comerciales",
    title: "Fachadas Comerciales",
    subtitle: "La imagen de tu empresa, en vidrio y aluminio",
    image: "/images/commercial_glass_facade.png",
    tag: "Corporativo",
  },
  {
    slug: "barandales",
    title: "Barandales de Vidrio",
    subtitle: "Seguridad sin obstruir la vista panorámica",
    image: "/images/glass_railing_balcony.png",
    tag: "Residencial / Comercial",
  },
  {
    slug: "vitrinas-comerciales",
    title: "Vitrinas Comerciales",
    subtitle: "Exhibe tu producto con máxima elegancia",
    image: "/images/vitrinas_comerciales_exhibicion.jpg",
    tag: "Comercial",
  },
];

export default function Servicios() {
  return (
    <div className="bg-leiva-surface min-h-screen">
      {/* Header de la Página */}
      <section className="bg-leiva-blue text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-4">
            Nuestros Servicios
          </h1>
          <div className="w-24 h-1 bg-leiva-amber mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluciones integrales en vidrio y aluminio para proyectos residenciales,
            comerciales e institucionales en Nicaragua. Fabricación, suministro e
            instalación con garantía profesional.
          </p>
        </div>
      </section>

      {/* Grid de Servicios */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/servicios/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-leiva-amber text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {service.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-leiva-blue font-poppins mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {service.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-leiva-amber font-semibold text-sm group-hover:gap-2 transition-all">
                    Ver Detalles <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-leiva-blue font-poppins mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
            Contáctanos. Trabajamos proyectos especiales y a medida para
            cualquier necesidad en vidrio y aluminio.
          </p>
          <Link
            href="/cotizar"
            className="inline-block bg-leiva-amber hover:bg-yellow-600 text-white px-10 py-4 rounded-md font-bold transition-colors shadow-lg text-lg"
          >
            Solicitar Cotización Gratuita
          </Link>
        </div>
      </section>
    </div>
  );
}
