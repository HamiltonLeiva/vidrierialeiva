"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/actions/auth";

export default function SecurityForm() {
  const [state, formAction, isPending] = useActionState(changePassword, null);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <span className="text-xs font-bold text-leiva-amber uppercase tracking-wider">
        Seguridad
      </span>
      <h1 className="text-3xl font-bold text-leiva-blue font-poppins mt-2">
        Cambiar contraseña
      </h1>
      <p className="text-sm text-gray-600 mt-2 mb-8">
        Usa una contraseña única de al menos 12 caracteres.
      </p>
      <form action={formAction} className="space-y-5">
        <input name="currentPassword" type="password" required placeholder="Contraseña actual" autoComplete="current-password" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5" />
        <input name="newPassword" type="password" required minLength={12} placeholder="Nueva contraseña" autoComplete="new-password" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5" />
        <input name="confirmation" type="password" required minLength={12} placeholder="Confirmar nueva contraseña" autoComplete="new-password" className="w-full border border-gray-200 bg-gray-50 rounded-xl p-3.5" />
        <button disabled={isPending} type="submit" className="w-full bg-leiva-blue text-white py-3.5 rounded-xl font-bold">
          {isPending ? "Guardando..." : "Actualizar contraseña"}
        </button>
        {state?.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
        {state?.success && <p role="status" className="text-sm text-emerald-600">Contraseña actualizada correctamente.</p>}
      </form>
    </div>
  );
}
