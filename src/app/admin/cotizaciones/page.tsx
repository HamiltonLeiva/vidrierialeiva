import prisma from "@/lib/prisma";
import QuoteManagementTable, { QuoteData } from "@/components/admin/QuoteManagementTable";
import { Clock, CheckCircle2, AlertCircle, TrendingUp, Layers } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminCotizaciones() {
  let quotes: QuoteData[] = [];
  let dbError = false;

  try {
    const rawQuotes = await prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    quotes = rawQuotes.map((q) => ({
      id: q.id,
      name: q.name,
      email: q.email,
      phone: q.phone,
      description: q.description,
      status: q.status as QuoteData["status"],
      createdAt: q.createdAt.toISOString(),
      items: q.items.map((item) => ({
        id: item.id,
        serviceType: item.serviceType,
        dimensions: item.dimensions,
        quantity: item.quantity,
      })),
    }));
  } catch (e) {
    dbError = true;
    console.error("Prisma error in AdminCotizaciones:", e);
  }

  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter((q) => q.status === "PENDING").length;
  const reviewingQuotes = quotes.filter((q) => q.status === "REVIEWING").length;
  const approvedQuotes = quotes.filter((q) => q.status === "APPROVED").length;
  const completedQuotes = quotes.filter((q) => q.status === "COMPLETED").length;

  return (
    <div className="bg-leiva-surface min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header del Dashboard */}
        <div className="mb-8">
          <span className="text-xs font-bold text-leiva-amber uppercase tracking-wider">
            Módulo Administrativo
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-leiva-blue font-poppins mt-1">
            Gestión de Cotizaciones y Pipeline
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Monitorea, actualiza y da seguimiento en tiempo real a las solicitudes de clientes de Vidriería Leiva.
          </p>
        </div>

        {/* Alerta de conexión si la DB no está activa */}
        {dbError && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r-xl shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <h3 className="font-bold text-amber-800 text-sm">
                  Aviso de Conectividad con Base de Datos
                </h3>
                <p className="text-amber-700 text-xs mt-0.5">
                  No se pudo establecer conexión activa con PostgreSQL (Supabase). Se muestra interfaz en modo preventivo. Verifica las variables de entorno en producción.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-gray-500 uppercase">Total</span>
              <Layers size={18} className="text-leiva-blue" />
            </div>
            <div className="text-2xl font-bold text-leiva-blue mt-2 font-poppins">
              {totalQuotes}
            </div>
            <span className="text-[11px] text-gray-400">Solicitudes registradas</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-amber-600 uppercase">Pendientes</span>
              <Clock size={18} className="text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-600 mt-2 font-poppins">
              {pendingQuotes}
            </div>
            <span className="text-[11px] text-gray-400">Requieren atención</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-blue-600 uppercase">En Revisión</span>
              <TrendingUp size={18} className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mt-2 font-poppins">
              {reviewingQuotes}
            </div>
            <span className="text-[11px] text-gray-400">En cálculo técnico</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-emerald-600 uppercase">Aprobadas</span>
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-600 mt-2 font-poppins">
              {approvedQuotes}
            </div>
            <span className="text-[11px] text-gray-400">Aceptadas por cliente</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs col-span-2 md:col-span-1">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-purple-600 uppercase">Completadas</span>
              <CheckCircle2 size={18} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mt-2 font-poppins">
              {completedQuotes}
            </div>
            <span className="text-[11px] text-gray-400">Instaladas con éxito</span>
          </div>
        </div>

        {/* Tabla Interactiva */}
        <QuoteManagementTable initialQuotes={quotes} />
      </div>
    </div>
  );
}
