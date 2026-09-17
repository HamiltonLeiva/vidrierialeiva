"use server";

import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  createSession,
  destroySession,
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
