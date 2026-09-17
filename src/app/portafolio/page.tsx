import PortfolioGallery, { ProjectItem } from "@/components/ui/PortfolioGallery";
import Link from "next/link";

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "Residencia Las Colinas",
    category: "Residencial",
    type: "Ventanas Panorámicas y Fachada Residencial",
    image: "/images/hero_vidrieria_leiva.jpg",
    size: "large",
  },
  {
    id: 2,
    title: "Edificio Corporativo Centro",
    category: "Comercial",
    type: "Muro Cortina en Vidrio Estructural",
    image: "/images/commercial_glass_facade.png",
    size: "medium",
  },
  {
    id: 3,
    title: "Baño Principal Minimalista",
    category: "Baños",
    type: "Mampara Templada Frameless",
    image: "/images/shower_glass_enclosure.png",
    size: "small",
  },
  {
    id: 4,
    title: "Balcón Vista al Lago",
    category: "Residencial",
    type: "Barandal de Vidrio Templado Laminado",
    image: "/images/glass_railing_balcony.png",
    size: "medium",
  },
  {
    id: 5,
    title: "Oficinas StartUp Managua",
    category: "Comercial",
    type: "Divisiones Internas y Puertas de Vidrio",
    image: "/images/commercial_glass_facade.png",
    size: "large",
  },
  {
    id: 6,
    title: "Remodelación Villa Fontana",
    category: "Residencial",
    type: "Puertas Plegables y Ventanas de Aluminio",
    image: "/images/puertas_vidrio_premium.jpg",
    size: "small",
  },
  {
    id: 7,
    title: "Exhibición Joyería Diamante",
    category: "Comercial",
    type: "Vitrinas Comerciales en Vidrio Extraclaro",
    image: "/images/vitrinas_comerciales_exhibicion.jpg",
    size: "medium",
  },
  {
    id: 8,
    title: "Torre Plaza Las Américas",
    category: "Fachadas",
    type: "Fachada de Vidrio con Control Solar",
    image: "/images/commercial_glass_facade.png",
    size: "large",
  },
];

export const metadata = {
  title: "Portafolio de Proyectos | Vidriería Leiva Nicaragua",
  description:
    "Descubre proyectos destacados de instalación de vidrio templado, ventanas de aluminio, fachadas comerciales y mamparas en Nicaragua.",
};

export default function Portafolio() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-leiva-blue font-poppins mb-4">
            Nuestro Portafolio
          </h1>
          <div className="w-24 h-1 bg-leiva-amber mx-auto mb-6" />
          <p className="text-lg text-gray-600">
            Explora la calidad de nuestros acabados en proyectos reales instalados
            en Nicaragua para hogares, comercios e industrias.
          </p>
        </div>

        {/* Galería Interactiva con Filtros y Lightbox */}
        <PortfolioGallery projects={PROJECTS} />

        {/* Sección CTA */}
        <div className="mt-20 bg-leiva-surface rounded-3xl p-10 md:p-14 text-center border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-leiva-blue font-poppins mb-4">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8 text-base md:text-lg">
            Fabricamos e instalamos soluciones arquitectónicas personalizadas
            para cualquier escala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cotizar"
              className="bg-leiva-amber hover:bg-yellow-600 text-white px-8 py-3.5 rounded-md font-bold transition-colors shadow-lg"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/contacto"
              className="bg-leiva-blue hover:bg-opacity-90 text-white px-8 py-3.5 rounded-md font-bold transition-colors"
            >
              Contactar Asesor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
