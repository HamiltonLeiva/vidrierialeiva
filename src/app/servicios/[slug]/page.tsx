import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, Phone } from "lucide-react";

const SERVICES: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  benefits: { title: string; desc: string }[];
}> = {
  "ventanas-de-aluminio": {
    title: "Ventanas de Aluminio",
    subtitle: "Diseño moderno, durabilidad garantizada",
    description:
      "Nuestras ventanas de aluminio de grado arquitectónico combinan resistencia estructural con una estética limpia y moderna. Fabricadas bajo medida para cada proyecto, ofrecen aislamiento térmico y acústico superior para hogares y comercios en Nicaragua.",
    image: "/images/ventanas_aluminio_modernas.jpg",
    features: [
      "Marcos de aluminio anodizado o pintado",
      "Vidrio simple, doble o laminado",
      "Perfiles corte térmico disponibles",
      "Acabados en blanco, negro, champagne y madera",
      "Apertura proyectante, corrediza o fija",
      "Garantía de instalación incluida",
    ],
    benefits: [
      { title: "Aislamiento Acústico", desc: "Reduce el ruido exterior hasta un 40% con vidrio doble." },
      { title: "Bajo Mantenimiento", desc: "El aluminio no se oxida, no se pudre y mantiene su color." },
      { title: "Seguridad Reforzada", desc: "Sistemas de cierre multipunto y vidrio de seguridad disponibles." },
      { title: "Eficiencia Energética", desc: "Perfiles de rotura de puente térmico para reducir pérdida de calor." },
    ],
  },
  "puertas-de-vidrio": {
    title: "Puertas de Vidrio",
    subtitle: "Elegancia que conecta espacios",
    description:
      "Las puertas de vidrio templado de Vidriería Leiva son el sello visual de espacios modernos y funcionales. Desde accesos comerciales con vidrio panorámico hasta puertas interiores plegables, diseñamos cada solución a la medida de tu proyecto.",
    image: "/images/puertas_vidrio_premium.jpg",
    features: [
      "Vidrio templado de seguridad 8mm, 10mm o 12mm",
      "Herrajes de acero inoxidable de alta gama",
      "Bisagras pivot o correderas ocultas",
      "Opciones: transparente, satinado, esmerilado",
      "Cerraduras digitales y mecánicas",
      "Instalación con garantía de plomada y nivel",
    ],
    benefits: [
      { title: "Apertura Visual", desc: "Amplían visualmente los espacios al dejar pasar la luz natural." },
      { title: "Alta Resistencia", desc: "El vidrio templado es 5 veces más resistente que el vidrio normal." },
      { title: "Diseño a Medida", desc: "Cada puerta se fabrica según las dimensiones exactas del vano." },
      { title: "Impacto Estético", desc: "Elevan la percepción de lujo y modernidad de cualquier espacio." },
    ],
  },
  "mamparas-para-bano": {
    title: "Mamparas para Baño",
    subtitle: "Transforma tu baño en un spa privado",
    description:
      "Nuestras mamparas de baño en vidrio templado redefinen la experiencia de tu espacio más personal. Diseñamos e instalamos mamparas fijas, abatibles, correderas y sin marco para cualquier configuración de ducha o bañera.",
    image: "/images/shower_glass_enclosure.png",
    features: [
      "Vidrio templado 6mm, 8mm o 10mm",
      "Sin marco (frameless) o con perfil de aluminio mínimo",
      "Tratamiento Easy Clean (anti-humedad)",
      "Bisagras y herrajes de acero inoxidable 316L",
      "Sello de silicón sanitario transparente",
      "Disponible en todos los colores de perfil",
    ],
    benefits: [
      { title: "Limpieza Sencilla", desc: "El tratamiento anti-cal reduce drásticamente el tiempo de limpieza." },
      { title: "Amplitud Visual", desc: "El vidrio sin marco hace que el baño se perciba más grande." },
      { title: "Durabilidad Total", desc: "Materiales resistentes a la humedad y productos de limpieza." },
      { title: "Instalación Precisa", desc: "Nivelación milimétrica para un sellado hermético perfecto." },
    ],
  },
  "fachadas-comerciales": {
    title: "Fachadas Comerciales",
    subtitle: "La primera impresión de tu negocio",
    description:
      "Las fachadas de vidrio y aluminio de Vidriería Leiva proyectan la imagen corporativa de tu empresa con el más alto estándar de calidad. Trabajamos con desarrolladores, arquitectos y empresarios para entregar sistemas de fachada que combinan estética, seguridad estructural y eficiencia energética.",
    image: "/images/commercial_glass_facade.png",
    features: [
      "Sistemas de muro cortina en aluminio estructural",
      "Vidrio laminado, templado y de control solar",
      "Fachadas ventiladas y unitizadas",
      "Sellado estructural de silicón neutro",
      "Integración con sistemas BMS",
      "Cumplimiento de normativa de sismorresistencia",
    ],
    benefits: [
      { title: "Imagen Corporativa", desc: "Una fachada de vidrio comunica modernidad y solidez empresarial." },
      { title: "Control Solar", desc: "Vidrios de baja emisividad reducen el calor interior hasta un 60%." },
      { title: "Seguridad Estructural", desc: "Diseño calculado para vientos y cargas sísmicas locales." },
      { title: "Plusvalía Inmueble", desc: "Incrementa el valor de mercado del inmueble significativamente." },
    ],
  },
  "barandales": {
    title: "Barandales de Vidrio",
    subtitle: "Seguridad sin obstruir la vista",
    description:
      "Los barandales de vidrio templado de Vidriería Leiva ofrecen protección total con diseño minimalista. Instalamos sistemas con o sin perfil, con pasamanos de acero inoxidable o madera, para balcones, escaleras interiores y terrazas.",
    image: "/images/glass_railing_balcony.png",
    features: [
      "Vidrio templado laminado 10+10mm o 12+12mm",
      "Fijación en base: sistema embutido o suelda",
      "Pasamanos de acero inoxidable, madera o aluminio",
      "Sin perfil inferior (canaleta mínima o sin canaleta)",
      "Certificación de carga horizontal conforme a normas",
      "Disponible con vidrio tintado o mate",
    ],
    benefits: [
      { title: "Vistas sin Obstáculos", desc: "El vidrio transparente mantiene la vista panorámica intacta." },
      { title: "Código de Seguridad", desc: "Vidrio laminado que no fragmenta al romperse, solo se agrieta." },
      { title: "Resistencia UV", desc: "No se decolora ni degrada con la exposición solar continua." },
      { title: "Elegancia Premium", desc: "El acabado más solicitado en residencias de alto nivel." },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export default async function ServicioDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES[slug];

  if (!service) notFound();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero del Servicio */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-leiva-blue via-leiva-blue/50 to-transparent" />
        </div>
        <div className="container mx-auto px-4 pb-12 relative z-10 text-white">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 text-leiva-amber font-semibold mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={18} /> Volver a Servicios
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-3">
            {service.title}
          </h1>
          <p className="text-xl text-leiva-amber font-medium">{service.subtitle}</p>
        </div>
      </section>

      {/* Descripción + Características */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold text-leiva-blue font-poppins mb-6">
                Descripción del Servicio
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {service.description}
              </p>

              <h3 className="text-xl font-bold text-leiva-blue font-poppins mb-4">
                Especificaciones Técnicas
              </h3>
              <ul className="space-y-3">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-leiva-green flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beneficios */}
            <div>
              <h2 className="text-2xl font-bold text-leiva-blue font-poppins mb-6">
                Beneficios Clave
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {service.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="bg-leiva-surface rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-leiva-blue mb-2">{b.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 bg-leiva-blue text-white rounded-2xl p-8">
                <h3 className="text-xl font-bold font-poppins mb-3">
                  ¿Listo para tu proyecto?
                </h3>
                <p className="text-gray-300 mb-6">
                  Solicita una cotización gratuita sin compromiso. Nuestro equipo
                  técnico te contactará en menos de 24 horas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/cotizar"
                    className="bg-leiva-amber hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-bold text-center transition-colors"
                  >
                    Solicitar Cotización
                  </Link>
                  <a
                    href="https://wa.me/50500000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-md font-bold transition-colors"
                  >
                    <Phone size={18} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
