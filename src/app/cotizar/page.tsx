"use client";

import Link from "next/link";
import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import { submitQuote } from "@/app/actions/quote";

export default function Cotizar() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string>("");
  const [quoteDetails, setQuoteDetails] = useState<{
    name: string;
    serviceType: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await submitQuote(formData);

    setIsLoading(false);

    if (result.success) {
      if (result.whatsappUrl) {
        setWhatsappLink(result.whatsappUrl);
      }
      if (result.data) {
        setQuoteDetails({
          name: result.data.name,
          serviceType: result.data.serviceType,
        });
      }
      setIsSubmitted(true);
    } else {
      alert("Hubo un error al enviar tu cotización. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="bg-leiva-surface min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-leiva-amber uppercase tracking-wider">
            Cotización Inmediata
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-leiva-blue font-poppins mt-2 mb-4">
            Cotizador de Proyectos
          </h1>
          <div className="w-24 h-1 bg-leiva-amber mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Completa los detalles de tu proyecto. Recibirás una estimación técnica
            precisa con los mejores materiales en vidrio y aluminio de Nicaragua.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white p-8 md:p-14 rounded-3xl shadow-xl text-center border-t-8 border-leiva-green animate-scale-in">
            <CheckCircle2 size={68} className="text-leiva-green mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-leiva-blue font-poppins mb-3">
              ¡Solicitud Recibida con Éxito!
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Gracias, <strong className="text-gray-900">{quoteDetails?.name || "estimado cliente"}</strong>. Tu requerimiento para{" "}
              <strong className="text-gray-900">{quoteDetails?.serviceType || "tu proyecto"}</strong> ha ingresado a nuestro sistema.
            </p>

            {/* Direct WhatsApp acceleration card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 max-w-lg mx-auto text-left">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-600 text-white p-3 rounded-xl flex-shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 text-base">
                    ¿Deseas respuesta inmediata?
                  </h4>
                  <p className="text-emerald-700 text-xs mt-1 leading-relaxed">
                    Envía los datos de tu cotización directamente a nuestro equipo de ventas por WhatsApp con un solo clic.
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <a
                  href={whatsappLink || "https://wa.me/50577000220?text=Hola%2C%20quiero%20enviar%20mi%20cotizaci%C3%B3n."}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white w-full py-3.5 px-6 rounded-xl font-bold transition-colors shadow-md"
                >
                  <MessageSquare size={18} />
                  Enviar por WhatsApp Ahora
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-leiva-blue text-white px-8 py-3.5 rounded-xl font-bold hover:bg-opacity-90 transition-all text-sm"
              >
                Registrar Otra Cotización
              </button>
              <Link
                href="/"
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3.5 rounded-xl font-semibold transition-all text-sm inline-flex items-center justify-center"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección 1: Datos de Contacto */}
              <div>
                <div className="flex items-center gap-2 text-leiva-blue font-bold text-xl mb-4 border-b border-gray-100 pb-3">
                  <span className="bg-leiva-blue text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-xs">
                    1
                  </span>
                  Datos del Contacto
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      name="name"
                      required
                      type="text"
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Ej. Ing. Hamilton Leiva"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm"
                      placeholder="+505 8888 8888"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Correo Electrónico (Opcional)
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm"
                      placeholder="contacto@ejemplo.com"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Especificaciones del Proyecto */}
              <div>
                <div className="flex items-center gap-2 text-leiva-blue font-bold text-xl mb-4 border-b border-gray-100 pb-3">
                  <span className="bg-leiva-blue text-white w-7 h-7 rounded-full inline-flex items-center justify-center text-xs">
                    2
                  </span>
                  Especificaciones Técnicas
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label
                      htmlFor="service-type"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Tipo de Servicio o Producto *
                    </label>
                    <select
                      id="service-type"
                      name="serviceType"
                      aria-label="Tipo de Servicio"
                      required
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm cursor-pointer"
                    >
                      <option value="">Selecciona una opción...</option>
                      <option value="Ventanas de Aluminio">Ventanas de Aluminio Arquitectónico</option>
                      <option value="Puertas de Vidrio">Puertas de Vidrio Templado</option>
                      <option value="Mamparas para Baño">Mamparas para Baño Frameless</option>
                      <option value="Fachadas Comerciales">Fachadas y Muros Cortina</option>
                      <option value="Barandales de Vidrio">Barandales y Pasamanos de Vidrio</option>
                      <option value="Vitrinas Comerciales">Vitrinas Comerciales</option>
                      <option value="Espejos Decorativos">Espejos Decorativos / LED</option>
                      <option value="Proyecto Especial a Medida">Proyecto Especial a Medida</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Medidas Aproximadas (Opcional)
                    </label>
                    <input
                      name="dimensions"
                      type="text"
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Ej. Ancho 2.40m x Alto 2.10m"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lugar de Instalación / Municipio
                    </label>
                    <input
                      name="location"
                      type="text"
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Ej. Managua, Las Colinas"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Detalles y requerimientos especiales *
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full border border-gray-200 bg-gray-50/50 rounded-xl p-3.5 focus:bg-white focus:ring-2 focus:ring-leiva-amber focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Describe acabados deseados (color de aluminio, grosor de vidrio, tipo de apertura, etc.)..."
                    />
                  </div>
                </div>
              </div>

              {/* Badges de Garantía */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-gray-600 text-xs bg-gray-50 p-3 rounded-xl">
                  <ShieldCheck className="text-leiva-green flex-shrink-0" size={18} />
                  <span>Garantía de instalación</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600 text-xs bg-gray-50 p-3 rounded-xl">
                  <Clock className="text-leiva-amber flex-shrink-0" size={18} />
                  <span>Respuesta en menos de 24h</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600 text-xs bg-gray-50 p-3 rounded-xl">
                  <Award className="text-leiva-blue flex-shrink-0" size={18} />
                  <span>Materiales certificados</span>
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-leiva-amber text-white font-bold text-lg py-4 rounded-xl hover:bg-yellow-600 transition-all flex justify-center items-center gap-2 shadow-lg shadow-leiva-amber/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send size={20} />
                {isLoading ? "Procesando cotización..." : "Enviar Solicitud de Cotización"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
