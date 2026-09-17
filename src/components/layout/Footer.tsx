import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-leiva-blue text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Image 
            src="/images/Logo-Vidreria-Leiva-Transparente.png" 
            alt="Vidriería Leiva Logo" 
            width={180} 
            height={60} 
            className="h-14 w-auto object-contain mb-4 block bg-transparent"
            style={{ backgroundColor: 'transparent', filter: 'brightness(0) invert(1)' }}
          />
          <p className="mb-4">Calidad profesional, seguridad garantizada. Soluciones modernas en vidrio y aluminio para hogares y empresas en Nicaragua.</p>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-leiva-amber transition-colors">Inicio</Link></li>
            <li><Link href="/servicios" className="hover:text-leiva-amber transition-colors">Servicios</Link></li>
            <li><Link href="/portafolio" className="hover:text-leiva-amber transition-colors">Portafolio</Link></li>
            <li><Link href="/tienda" className="hover:text-leiva-amber transition-colors">Tienda Online</Link></li>
            <li><Link href="/dashboard" className="hover:text-leiva-amber transition-colors">Acceder al Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Servicios</h4>
          <ul className="space-y-2">
            <li><Link href="/servicios/ventanas-de-aluminio" className="hover:text-leiva-amber transition-colors">Ventanas de Aluminio</Link></li>
            <li><Link href="/servicios/puertas-de-vidrio" className="hover:text-leiva-amber transition-colors">Puertas de Vidrio</Link></li>
            <li><Link href="/servicios/mamparas-para-bano" className="hover:text-leiva-amber transition-colors">Mamparas para Baño</Link></li>
            <li><Link href="/servicios/fachadas-comerciales" className="hover:text-leiva-amber transition-colors">Fachadas Comerciales</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Contacto</h4>
          <ul className="space-y-2">
            <li>Nicaragua</li>
            <li>+505 7700 0220</li>
            <li>vidrierialeiva@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} HL Group. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
