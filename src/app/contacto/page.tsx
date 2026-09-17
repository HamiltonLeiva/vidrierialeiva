import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contacto() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-leiva-blue font-poppins mb-6">Contáctanos</h1>
      <div className="w-24 h-1 bg-leiva-amber mb-8"></div>
      
      <div className="grid md:grid-cols-2 gap-12 mt-12">
        <div>
          <h2 className="text-2xl font-bold text-leiva-blue mb-6">Información de Contacto</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="bg-leiva-amber text-white p-3 rounded-full"><MapPin /></div>
              <p className="text-gray-700 text-lg">Managua, Nicaragua</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-leiva-amber text-white p-3 rounded-full"><Phone /></div>
              <p className="text-gray-700 text-lg">+505 7700 0220</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-leiva-amber text-white p-3 rounded-full"><Mail /></div>
              <p className="text-gray-700 text-lg">vidrierialeiva@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-leiva-blue mb-6">Envíanos un mensaje</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre completo</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-leiva-amber focus:ring-1 focus:ring-leiva-amber" placeholder="Tu nombre..." />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Correo electrónico</label>
              <input type="email" className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-leiva-amber focus:ring-1 focus:ring-leiva-amber" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Mensaje</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:border-leiva-amber focus:ring-1 focus:ring-leiva-amber" placeholder="¿En qué podemos ayudarte?"></textarea>
            </div>
            <button className="w-full bg-leiva-blue text-white font-bold py-3 rounded-md hover:bg-opacity-90 transition-all">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
