"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  createSession,
  destroySession,
  destroyAllUserSessions,
  getCurrentUser,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";

export async function login(
  _previousState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { success: false, error: "Ingresa tu correo y contraseña." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return { success: false, error: "Las credenciales no son válidas." };
  }

  if (user.role === "USER") {
    return { success: false, error: "Tu cuenta no tiene acceso administrativo." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await destroySession();
  redirect("/login");
}

export async function changePassword(
  _previousState: { success: boolean; error?: string } | null,
  formData: FormData
) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Tu sesión expiró." };

  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmation = String(formData.get("confirmation") || "");

  if (newPassword.length < 12 || newPassword.length > 128) {
    return { success: false, error: "La nueva contraseña debe tener entre 12 y 128 caracteres." };
  }
  if (newPassword !== confirmation) {
    return { success: false, error: "Las contraseñas nuevas no coinciden." };
  }
  if (!(await verifyPassword(currentPassword, user.password))) {
    return { success: false, error: "La contraseña actual no es válida." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { password: await hashPassword(newPassword) },
  });
  await destroyAllUserSessions(user.id);
  await createSession(user.id);
  await prisma.auditLog.create({
    data: { userId: user.id, action: "PASSWORD_CHANGED" },
  });
  return { success: true };
}
