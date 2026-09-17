"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";

export async function updateQuoteStatus(quoteId: string, status: string) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"]);
    const validStatuses = ["PENDING", "REVIEWING", "APPROVED", "REJECTED", "COMPLETED"] as const;
    if (!validStatuses.includes(status as (typeof validStatuses)[number])) {
      return { success: false, error: "Estado de cotización inválido." };
    }
    await prisma.quote.update({
      where: { id: quoteId },
      data: { status: status as (typeof validStatuses)[number] },
    });
    revalidatePath("/admin/cotizaciones");
    return { success: true };
  } catch (error) {
    console.error("Error actualizando estado:", error);
    return { success: false, error: "No se pudo actualizar el estado." };
  }
}

export async function deleteQuote(quoteId: string) {
  try {
    await requireRole(["SUPER_ADMIN"]);
    // Delete items first (cascade not automatic with Prisma)
    await prisma.$transaction([
      prisma.quoteItem.deleteMany({ where: { quoteId } }),
      prisma.quote.delete({ where: { id: quoteId } }),
    ]);
    revalidatePath("/admin/cotizaciones");
    return { success: true };
  } catch (error) {
    console.error("Error eliminando cotización:", error);
    return { success: false, error: "No se pudo eliminar la cotización." };
  }
}

export async function getQuoteStats() {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"]);
    const [total, pending, reviewing, approved, completed] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: "PENDING" } }),
      prisma.quote.count({ where: { status: "REVIEWING" } }),
      prisma.quote.count({ where: { status: "APPROVED" } }),
      prisma.quote.count({ where: { status: "COMPLETED" } }),
    ]);
    return { total, pending, reviewing, approved, completed };
  } catch {
    return { total: 0, pending: 0, reviewing: 0, approved: 0, completed: 0 };
  }
}
