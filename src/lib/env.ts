function required(name: string) {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function validateEnvironment() {
  required("DATABASE_URL");
  required("DIRECT_URL");
}
