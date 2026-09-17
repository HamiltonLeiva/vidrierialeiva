import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ui/ServiceCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { CheckCircle2, Shield, Clock, Wrench } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_vidrieria_leiva.jpg"
            alt="Ventanas panorámicas modernas"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-leiva-blue/60 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-leiva-surface via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 leading-tight">
              Transformamos tus espacios con <span className="text-leiva-amber">Elegancia y Seguridad</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl">
              Somos expertos en la fabricación e instalación de sistemas de vidrio y aluminio premium en Nicaragua. Calidad garantizada para tu hogar o negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/cotizar" className="bg-leiva-amber hover:bg-yellow-600 text-white px-8 py-3 rounded-md font-bold text-center transition-colors shadow-lg text-lg">
                Solicitar Presupuesto
              </Link>
              <Link href="/portafolio" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-md font-bold text-center transition-colors text-lg">
                Ver Proyectos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS DESTACADOS */}
      <section className="py-20 bg-leiva-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-leiva-blue font-poppins mb-4">Nuestros Servicios</h2>
            <div className="w-24 h-1 bg-leiva-amber mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              Ofrecemos soluciones arquitectónicas modernas con los más altos estándares de calidad y durabilidad en el mercado nicaragüense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Mamparas de Lujo" 
              description="Diseños minimalistas en vidrio templado que transforman tu baño en un espacio de relajación y elegancia."
              imageSrc="/images/shower_glass_enclosure.png"
              link="/servicios/mamparas-para-bano"
            />
            <ServiceCard 
              title="Barandales de Vidrio" 
              description="Seguridad y vistas panorámicas ininterrumpidas para balcones, escaleras y terrazas con acabados premium."
              imageSrc="/images/glass_railing_balcony.png"
              link="/servicios/barandales"
            />
            <ServiceCard 
              title="Fachadas Comerciales" 
              description="Sistemas de fachadas integrales de vidrio y aluminio para proyectar una imagen corporativa moderna y profesional."
              imageSrc="/images/commercial_glass_facade.png"
              link="/servicios/fachadas-comerciales"
            />
          </div>
          
          <div className="text-center mt-12">
            <Link href="/servicios" className="inline-block border-2 border-leiva-blue text-leiva-blue hover:bg-leiva-blue hover:text-white px-8 py-3 rounded-md font-bold transition-colors">
              Ver Todos los Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-leiva-blue font-poppins mb-6">¿Por qué elegir a Vidriería Leiva?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Con años de experiencia en el sector, nos destacamos por nuestro compromiso con la excellence. No solo instalamos vidrio y aluminio, construimos tranquilidad y belleza para tus espacios.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1"><Shield className="text-leiva-green" size={28} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-leiva-blue">Materiales Certificados</h4>
                    <p className="text-gray-600">Utilizamos únicamente vidrio templado y aluminio de grado arquitectónico para máxima seguridad.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1"><Clock className="text-leiva-amber" size={28} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-leiva-blue">Entregas Puntuales</h4>
                    <p className="text-gray-600">Respetamos tu tiempo. Cumplimos rigurosamente con los cronogramas de instalación acordados.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1"><Wrench className="text-leiva-red" size={28} /></div>
                  <div>
                    <h4 className="text-xl font-bold text-leiva-blue">Acabados Perfectos</h4>
                    <p className="text-gray-600">Nuestro equipo de técnicos especializados cuida cada milímetro de la instalación.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <Image 
                  src="/images/hero_modern_windows.png" 
                  alt="Instalación profesional" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-leiva-blue text-white p-8 rounded-xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold font-poppins text-leiva-amber mb-2">+1000</p>
                <p className="font-medium text-lg">Proyectos Exitosos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 bg-leiva-surface">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-leiva-blue font-poppins mb-4">Lo que dicen nuestros clientes</h2>
            <div className="w-24 h-1 bg-leiva-amber mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Carlos Mendoza"
              role="Arquitecto"
              content="La calidad del aluminio y la precisión en la instalación de las fachadas comerciales superó mis expectativas. Excelente equipo de profesionales."
            />
            <TestimonialCard 
              name="Ana Castillo"
              role="Propietaria Residencial"
              content="Instalaron unas mamparas hermosas en mis baños. Fueron muy puntuales, limpios al trabajar y el acabado es simplemente perfecto y de lujo."
            />
            <TestimonialCard 
              name="Roberto Silva"
              role="Gerente de Operaciones"
              content="Recomendados al 100%. Remodelamos toda la oficina con sus ventanas panorámicas y el aislamiento acústico es real. Cumplieron con los tiempos."
            />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-leiva-blue relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-leiva-amber/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-leiva-green/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins mb-6">¿Listo para modernizar tu espacio?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Cotiza hoy mismo. Nuestro equipo de asesores está listo para brindarte la mejor solución técnica y estética para tu proyecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cotizar" className="bg-leiva-amber hover:bg-yellow-600 text-white px-10 py-4 rounded-md font-bold transition-all shadow-lg text-lg flex items-center justify-center gap-2">
              <CheckCircle2 size={24} /> Iniciar Cotización Gratuita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
