"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

export interface ProjectItem {
  id: number;
  title: string;
  category: "Residencial" | "Comercial" | "Baños" | "Fachadas";
  type: string;
  image: string;
  size: "large" | "medium" | "small";
}

const CATEGORIES = ["Todos", "Residencial", "Comercial", "Baños", "Fachadas"] as const;

export default function PortfolioGallery({ projects }: { projects: ProjectItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [selectedImage, setSelectedImage] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Filtros de Categoría */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-leiva-blue text-white shadow-md shadow-leiva-blue/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid de Proyectos */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedImage(project)}
            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div
              className={`relative ${
                project.size === "large"
                  ? "h-96"
                  : project.size === "medium"
                  ? "h-72"
                  : "h-64"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-leiva-blue/95 via-leiva-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-leiva-amber font-bold text-xs uppercase tracking-wider mb-1">
                {project.category}
              </span>
              <h3 className="text-white text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-gray-300 text-sm">{project.type}</p>
              <div
                aria-label={`Ver ${project.title}`}
                className="absolute top-4 right-4 bg-white/20 p-2.5 rounded-full text-white backdrop-blur-sm hover:bg-white/40 transition-colors"
              >
                <Maximize2 size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No hay proyectos disponibles en esta categoría actualmente.
        </div>
      )}

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-leiva-blue/80 hover:bg-leiva-blue text-white p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Cerrar vista previa"
            >
              <X size={20} />
            </button>
            <div className="relative h-[60vh] min-h-[350px] w-full">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-leiva-amber">
                  {selectedImage.category}
                </span>
                <h3 className="text-2xl font-bold text-leiva-blue font-poppins">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600 text-sm">{selectedImage.type}</p>
              </div>
              <a
                href="/cotizar"
                className="bg-leiva-amber hover:bg-yellow-600 text-white px-6 py-2.5 rounded-md font-bold text-sm transition-colors"
              >
                Cotizar Proyecto Similar
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
