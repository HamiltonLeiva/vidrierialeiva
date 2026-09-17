import Image from 'next/image';
import { ShoppingCart, Search } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Espejo Led Rectangular', price: 120, category: 'Espejos', image: '/images/espejos_decorativos_lujo.jpg' },
  { id: 2, name: 'Kit Herrajes Mampara', price: 45, category: 'Accesorios', image: '/images/shower_glass_enclosure.png' },
  { id: 3, name: 'Silicón Estructural Transparente', price: 12, category: 'Materiales', image: '/images/glass_railing_balcony.png' },
  { id: 4, name: 'Manija de Acero Inoxidable', price: 35, category: 'Accesorios', image: '/images/commercial_glass_facade.png' },
  { id: 5, name: 'Vidrio Templado 10mm (M2)', price: 85, category: 'Vidrios', image: '/images/shower_glass_enclosure.png' },
  { id: 6, name: 'Perfil de Aluminio Blanco', price: 25, category: 'Aluminio', image: '/images/ventanas_aluminio_modernas.jpg' },
];

export default function Tienda() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-leiva-blue font-poppins mb-4">Catálogo de Productos</h1>
            <div className="w-24 h-1 bg-leiva-amber mb-6"></div>
            <p className="text-lg text-gray-600">Materiales, accesorios y productos listos para entrega.</p>
          </div>
          
          <div className="w-full md:w-auto mt-6 md:mt-0 flex gap-4">
            <div className="relative w-full md:w-64">
              <input type="text" placeholder="Buscar productos..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leiva-amber" />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button className="bg-leiva-blue text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-opacity-90">
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Carrito (0)</span>
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {['Todos', 'Vidrios', 'Aluminio', 'Accesorios', 'Espejos', 'Materiales'].map(cat => (
            <button key={cat} className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${cat === 'Todos' ? 'bg-leiva-amber text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-leiva-amber hover:text-leiva-amber'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {DUMMY_PRODUCTS.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className="text-xs font-bold text-leiva-amber uppercase tracking-wider">{product.category}</span>
                <h3 className="text-lg font-bold text-leiva-blue mt-1 mb-2 line-clamp-1">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <button className="bg-gray-100 hover:bg-leiva-amber hover:text-white text-leiva-blue p-2 rounded-full transition-colors" aria-label="Añadir al carrito">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
