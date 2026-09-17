import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.vidrierialeiva.com";

  const staticRoutes = [
    "",
    "/servicios",
    "/portafolio",
    "/cotizar",
    "/tienda",
    "/nosotros",
    "/contacto",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/cotizar" || route === "/servicios" ? 0.9 : 0.8,
  }));

  const serviceSlugs = [
    "ventanas-de-aluminio",
    "puertas-de-vidrio",
    "mamparas-para-bano",
    "fachadas-comerciales",
    "barandales",
  ].map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceSlugs];
}
