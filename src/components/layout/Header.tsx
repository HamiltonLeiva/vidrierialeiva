"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Portafolio', path: '/portafolio' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/Logo-Vidreria-Leiva-Transparente.png"
            alt="Vidriería Leiva Logo"
            width={180}
            height={60}
            className="h-12 w-auto object-contain bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className="text-gray-700 hover:text-leiva-amber font-medium transition-colors">
              {link.name}
            </Link>
          ))}
          <Link href="/dashboard" className="text-leiva-blue hover:text-leiva-amber font-semibold transition-colors">
            Acceder al Dashboard
          </Link>
          <Link href="/cotizar" className="bg-leiva-amber text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-90 transition-all shadow-md">
            Cotizar Ahora
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-leiva-blue" onClick={() => setIsOpen(!isOpen)} aria-label="Menú">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden bg-white absolute w-full border-t border-gray-100 shadow-xl pb-6">
          <nav className="flex flex-col space-y-4 px-6 pt-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} onClick={() => setIsOpen(false)} className="text-gray-800 font-medium text-lg border-b border-gray-50 pb-2">
                {link.name}
              </Link>
            ))}
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="text-leiva-blue font-semibold text-lg border-b border-gray-50 pb-2">
              Acceder al Dashboard
            </Link>
            <Link href="/cotizar" onClick={() => setIsOpen(false)} className="bg-leiva-amber text-white px-6 py-3 rounded-md font-bold text-center mt-4">
              Cotizar Ahora
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
