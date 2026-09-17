"use client";

import { useState, useTransition } from "react";
import { updateQuoteStatus, deleteQuote } from "@/app/actions/admin";
import {
  Search,
  Filter,
  Eye,
  Trash2,
  Mail,
  Calendar,
  FileText,
  X,
  MessageCircle,
} from "lucide-react";

export interface QuoteItemData {
  id: string;
  serviceType: string;
  dimensions: string | null;
  quantity: number;
}

export interface QuoteData {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  status: "PENDING" | "REVIEWING" | "APPROVED" | "REJECTED" | "COMPLETED";
  createdAt: string | Date;
  items: QuoteItemData[];
}

type QuoteStatus = QuoteData["status"];

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; border: string }
> = {
  PENDING: {
    label: "Pendiente",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  REVIEWING: {
    label: "En Revisión",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  APPROVED: {
    label: "Aprobada",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
  REJECTED: {
    label: "Rechazada",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
  },
  COMPLETED: {
    label: "Completada",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-200",
  },
};

export default function QuoteManagementTable({
  initialQuotes,
}: {
  initialQuotes: QuoteData[];
}) {
  const [quotes, setQuotes] = useState<QuoteData[]>(initialQuotes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "ALL">("ALL");
  const [selectedQuote, setSelectedQuote] = useState<QuoteData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.phone.includes(searchTerm) ||
      quote.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : quote.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (quoteId: string, newStatus: QuoteStatus) => {
    startTransition(async () => {
      const res = await updateQuoteStatus(quoteId, newStatus);
      if (res.success) {
        setQuotes((prev) =>
          prev.map((q) =>
            q.id === quoteId ? { ...q, status: newStatus } : q
          )
        );
        if (selectedQuote && selectedQuote.id === quoteId) {
          setSelectedQuote((prev) =>
            prev ? { ...prev, status: newStatus } : null
          );
        }
        showFeedback("Estado actualizado correctamente");
      } else {
        showFeedback("Error al actualizar el estado");
      }
    });
  };

  const handleDelete = (quoteId: string) => {
    if (!confirm("¿Estás seguro de eliminar esta cotización?")) return;

    startTransition(async () => {
      const res = await deleteQuote(quoteId);
      if (res.success) {
        setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
        if (selectedQuote?.id === quoteId) setSelectedQuote(null);
        showFeedback("Cotización eliminada correctamente");
      } else {
        showFeedback("Error al eliminar la cotización");
      }
    });
  };

  const showFeedback = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-leiva-blue text-white px-5 py-3 rounded-lg shadow-xl text-sm font-medium border border-leiva-amber/40 animate-fade-in">
          {actionMessage}
        </div>
      )}

      {/* Controles de Búsqueda y Filtros */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por cliente, teléfono, correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-leiva-blue/20 focus:border-leiva-blue"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter size={16} className="text-gray-400 flex-shrink-0" />
          <button
            onClick={() => setStatusFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === "ALL"
                ? "bg-leiva-blue text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Todas ({quotes.length})
          </button>
          {(Object.keys(STATUS_CONFIG) as QuoteStatus[]).map((key) => {
            const config = STATUS_CONFIG[key];
            const count = quotes.filter((q) => q.status === key).length;
            return (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  statusFilter === key
                    ? `${config.bg} ${config.text} border ${config.border} font-bold`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {config.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tabla de Cotizaciones */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-leiva-blue text-white text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Fecha</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Contacto</th>
                <th className="p-4 font-semibold">Servicio Requerido</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400">
                    <FileText className="mx-auto mb-2 text-gray-300" size={32} />
                    No se encontraron cotizaciones con los criterios actuales.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => {
                  const statusConf =
                    STATUS_CONFIG[quote.status] || STATUS_CONFIG.PENDING;
                  const dateStr = new Date(quote.createdAt).toLocaleDateString(
                    "es-NI",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  );
                  const cleanPhone = quote.phone.replace(/[^0-9]/g, "");

                  return (
                    <tr
                      key={quote.id}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="p-4 whitespace-nowrap text-gray-500 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-gray-400" />
                          {dateStr}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-bold text-gray-900">{quote.name}</div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-1">
                          <a
                            href={`https://wa.me/505${cleanPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            <MessageCircle size={13} />
                            {quote.phone}
                          </a>
                          <div className="text-xs text-gray-500 truncate max-w-[180px]">
                            {quote.email}
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-gray-800">
                          {quote.items[0]?.serviceType || "Servicio General"}
                        </div>
                        {quote.items[0]?.dimensions && (
                          <div className="text-xs text-gray-500">
                            Dim: {quote.items[0].dimensions} (Cant:{" "}
                            {quote.items[0].quantity})
                          </div>
                        )}
                        <p className="text-xs text-gray-400 line-clamp-1 max-w-xs mt-0.5">
                          {quote.description}
                        </p>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <select
                          value={quote.status}
                          disabled={isPending}
                          onChange={(e) =>
                            handleStatusChange(quote.id, e.target.value as QuoteStatus)
                          }
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border cursor-pointer focus:outline-none ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="REVIEWING">En Revisión</option>
                          <option value="APPROVED">Aprobada</option>
                          <option value="REJECTED">Rechazada</option>
                          <option value="COMPLETED">Completada</option>
                        </select>
                      </td>

                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedQuote(quote)}
                            title="Ver detalles completos"
                            className="p-1.5 text-gray-500 hover:text-leiva-blue hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(quote.id)}
                            title="Eliminar cotización"
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Detalle de Cotización */}
      {selectedQuote && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-leiva-blue text-white p-6 flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wider text-leiva-amber font-bold">
                  Detalle de Solicitud
                </span>
                <h3 className="text-2xl font-bold font-poppins mt-1">
                  {selectedQuote.name}
                </h3>
                <p className="text-xs text-gray-300 mt-1">
                  Recibida el{" "}
                  {new Date(selectedQuote.createdAt).toLocaleString("es-NI")}
                </p>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-300 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    Teléfono / WhatsApp
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-gray-800">
                      {selectedQuote.phone}
                    </span>
                    <a
                      href={`https://wa.me/505${selectedQuote.phone.replace(
                        /[^0-9]/g,
                        ""
                      )}?text=${encodeURIComponent(
                        `Hola ${selectedQuote.name}, te contactamos de Vidriería Leiva respecto a tu solicitud de cotización.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1"
                    >
                      <MessageCircle size={14} /> Chatear
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium">
                    Correo Electrónico
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-bold text-gray-800 text-sm truncate">
                      {selectedQuote.email}
                    </span>
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="bg-leiva-blue hover:bg-opacity-90 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1"
                    >
                      <Mail size={14} /> Enviar
                    </a>
                  </div>
                </div>
              </div>

              {/* Items Desglosados */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider text-leiva-blue">
                  Servicio / Elementos Solicitados
                </h4>
                <div className="space-y-2">
                  {selectedQuote.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3.5 bg-leiva-surface rounded-xl flex justify-between items-center border border-gray-100"
                    >
                      <div>
                        <div className="font-bold text-gray-800">
                          {item.serviceType}
                        </div>
                        {item.dimensions && (
                          <div className="text-xs text-gray-500">
                            Dimensiones estimadas: {item.dimensions}
                          </div>
                        )}
                      </div>
                      <span className="bg-white px-3 py-1 rounded-md font-bold text-xs text-leiva-blue border border-gray-200">
                        Cant: {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Descripción del cliente */}
              <div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider text-leiva-blue">
                  Notas Adicionales del Proyecto
                </h4>
                <div className="p-4 bg-gray-50 rounded-xl text-gray-700 text-sm leading-relaxed border border-gray-100 whitespace-pre-wrap">
                  {selectedQuote.description || "Sin descripción adicional."}
                </div>
              </div>

              {/* Selector de Estado */}
              <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">
                  Estado actual de la solicitud:
                </span>
                <select
                  value={selectedQuote.status}
                  onChange={(e) =>
                    handleStatusChange(selectedQuote.id, e.target.value as QuoteStatus)
                  }
                  className="text-xs font-bold px-3 py-2 rounded-lg border bg-white cursor-pointer"
                >
                  <option value="PENDING">Pendiente</option>
                  <option value="REVIEWING">En Revisión</option>
                  <option value="APPROVED">Aprobada</option>
                  <option value="REJECTED">Rechazada</option>
                  <option value="COMPLETED">Completada</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
