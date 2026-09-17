"use server";

import prisma from "@/lib/prisma";

export async function submitQuote(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const serviceType = String(formData.get("serviceType") || "").trim();
  const dimensions = String(formData.get("dimensions") || "").trim() || "No especificadas";
  const location = String(formData.get("location") || "").trim() || "No especificada";
  const description = String(formData.get("description") || "").trim();

  if (!name || !phone || !serviceType || !description) {
    return { success: false, error: "Completa los campos obligatorios." };
  }
  if (name.length > 120 || phone.length > 40 || email.length > 254 || description.length > 4000) {
    return { success: false, error: "Uno o más campos exceden el límite permitido." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Ingresa un correo electrónico válido." };
  }

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
    console.error("Prisma error al guardar cotización:", error);
    return {
      success: false,
      whatsappUrl,
      error: "No pudimos guardar tu solicitud. Intenta nuevamente en unos minutos.",
    };
  }
}
