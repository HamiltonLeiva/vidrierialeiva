import prisma from "@/lib/prisma";
import QuoteManagementTable, { QuoteData } from "@/components/admin/QuoteManagementTable";
import { Clock, CheckCircle2, AlertCircle, TrendingUp, Layers } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminCotizaciones({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
    redirect("/login");
  }
  const params = await searchParams;
  const page = Math.max(1, Number.parseInt(params.page || "1", 10) || 1);
  const pageSize = 25;
  const search = params.q?.trim() || "";
  const status = ["PENDING", "REVIEWING", "APPROVED", "REJECTED", "COMPLETED"].includes(params.status || "")
    ? params.status
    : undefined;
  let quotes: QuoteData[] = [];
  let dbError = false;
  let totalQuotes = 0;
  let countsByStatus = new Map<string, number>();

  try {
    const where = {
      ...(status ? { status: status as "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED" | "COMPLETED" } : {}),
      ...(search ? { OR: [{ name: { contains: search, mode: "insensitive" as const } }, { email: { contains: search, mode: "insensitive" as const } }, { phone: { contains: search } }] } : {}),
    };
    const [rawQuotes, count, groupedCounts] = await Promise.all([
      prisma.quote.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
      prisma.quote.count({ where }),
      prisma.quote.groupBy({ by: ["status"], _count: { _all: true } }),
    ]);
    totalQuotes = count;
    countsByStatus = new Map(groupedCounts.map((entry) => [entry.status, entry._count._all]));

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

  const pendingQuotes = countsByStatus.get("PENDING") || 0;
  const reviewingQuotes = countsByStatus.get("REVIEWING") || 0;
  const approvedQuotes = countsByStatus.get("APPROVED") || 0;
  const completedQuotes = countsByStatus.get("COMPLETED") || 0;

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
          <div className="flex items-center gap-3 mt-4">
            <span className="text-xs text-gray-500">{user.email}</span>
            <a href="/admin/seguridad" className="text-xs font-semibold text-leiva-blue hover:underline">
              Seguridad
            </a>
            <form action={logout}>
              <button type="submit" className="text-xs font-semibold text-leiva-blue hover:underline">
                Cerrar sesión
              </button>
            </form>
          </div>
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
        <QuoteManagementTable
          initialQuotes={quotes}
          canDelete={user.role === "SUPER_ADMIN"}
        />
        {totalQuotes > 25 && (
          <div className="flex justify-between mt-4 text-sm">
            {page > 1 ? <a className="text-leiva-blue hover:underline" href={`/admin/cotizaciones?page=${page - 1}`}>Anterior</a> : <span />}
            <span className="text-gray-500">Página {page} de {Math.ceil(totalQuotes / 25)}</span>
            {page < Math.ceil(totalQuotes / 25) ? <a className="text-leiva-blue hover:underline" href={`/admin/cotizaciones?page=${page + 1}`}>Siguiente</a> : <span />}
          </div>
        )}
      </div>
    </div>
  );
}
