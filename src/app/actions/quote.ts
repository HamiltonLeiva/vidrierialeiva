"use server";

import prisma from "@/lib/prisma";

export async function submitQuote(formData: FormData) {
  const name = (formData.get("name") as string) || "";
  const phone = (formData.get("phone") as string) || "";
  const email = (formData.get("email") as string) || "";
  const serviceType = (formData.get("serviceType") as string) || "";
  const dimensions = (formData.get("dimensions") as string) || "No especificadas";
  const location = (formData.get("location") as string) || "No especificada";
  const description = (formData.get("description") as string) || "";

  const fullDescription = `Ubicación: ${location}\nDescripción: ${description}`;

  // Formato del mensaje para WhatsApp
  const whatsappMessage = `*Nueva Solicitud de Cotización - Vidriería Leiva*\n\n` +
    `👤 *Cliente:* ${name}\n` +
    `📱 *Teléfono:* ${phone}\n` +
    `✉️ *Correo:* ${email || "No provisto"}\n` +
    `🛠️ *Servicio:* ${serviceType}\n` +
    `📐 *Dimensiones:* ${dimensions}\n` +
    `📍 *Ubicación:* ${location}\n` +
    `📝 *Detalle:* ${description}`;

  const whatsappUrl = `https://wa.me/50588888888?text=${encodeURIComponent(whatsappMessage)}`;

  try {
    await prisma.quote.create({
      data: {
        name,
        phone,
        email: email || "no-email@vidrierialeiva.com",
        description: fullDescription,
        items: {
          create: [
            {
              serviceType,
              dimensions,
              quantity: 1,
            },
          ],
        },
      },
    });

    return {
      success: true,
      whatsappUrl,
      data: { name, phone, serviceType, dimensions },
    };
  } catch (error) {
    console.error("Prisma error al guardar cotización (fallback activo):", error);
    // Modo resiliente: permite al usuario continuar por WhatsApp aunque la BD falle
    return {
      success: true,
      whatsappUrl,
      data: { name, phone, serviceType, dimensions },
      warning: "Guardado en modo contingencia",
    };
  }
}
