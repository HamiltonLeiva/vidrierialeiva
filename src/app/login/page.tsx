"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-leiva-surface flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
        <span className="text-xs font-bold text-leiva-amber uppercase tracking-wider">
          Acceso seguro
        </span>
        <h1 className="text-3xl font-bold text-leiva-blue font-poppins mt-2">
          Dashboard administrativo
        </h1>
        <p className="text-sm text-gray-600 mt-2 mb-8">
          Ingresa con una cuenta autorizada para gestionar las cotizaciones.
        </p>
        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-leiva-amber"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5 outline-none focus:ring-2 focus:ring-leiva-amber"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-leiva-blue text-white py-3.5 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            {isPending ? "Validando..." : "Iniciar sesión"}
          </button>
          {state?.error && (
            <p role="alert" className="text-sm text-red-600 text-center">
              {state.error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
