import { randomBytes, scrypt as nodeScrypt } from "node:crypto";
import { promisify } from "node:util";
import { writeFile } from "node:fs/promises";
import { PrismaClient } from "@prisma/client";

const scrypt = promisify(nodeScrypt);
const prisma = new PrismaClient();

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = await scrypt(password, salt, 64);
  return `scrypt:${salt}:${key.toString("hex")}`;
}

const accounts = [
  {
    email: "admin@vidrierialeiva.com",
    name: "Administrador General",
    role: "SUPER_ADMIN",
  },
  {
    email: "operaciones@vidrierialeiva.com",
    name: "Administrador Secundario",
    role: "ADMIN",
  },
];

const credentials = [];

try {
  for (const account of accounts) {
    const password = `${randomBytes(18).toString("base64url")}!`;
    await prisma.user.upsert({
      where: { email: account.email },
      update: {
        name: account.name,
        role: account.role,
        password: await hashPassword(password),
      },
      create: {
        email: account.email,
        name: account.name,
        role: account.role,
        password: await hashPassword(password),
      },
    });
    credentials.push(`${account.name}\nCorreo: ${account.email}\nContraseña temporal: ${password}\n`);
  }

  await writeFile(
    ".admin-credentials.txt",
    [
      "Credenciales temporales generadas el " + new Date().toISOString(),
      "Cámbialas después del primer inicio de sesión.",
      "",
      ...credentials,
    ].join("\n"),
    { encoding: "utf8", flag: "w" }
  );
  console.log("Cuentas administrativas creadas/actualizadas.");
} finally {
  await prisma.$disconnect();
}
