import Link from 'next/link';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-leiva-blue text-white text-sm py-2 px-4 hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <span className="flex items-center gap-2"><Phone size={16} /> +505 7700 0220</span>
          <span className="flex items-center gap-2"><MapPin size={16} /> Nicaragua</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-2"><MessageCircle size={16} /> WhatsApp Disponible</span>
          <Link
            href="/dashboard"
            className="rounded-md border border-white/40 px-3 py-1 font-semibold transition-colors hover:bg-white hover:text-leiva-blue"
          >
            Acceder al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
