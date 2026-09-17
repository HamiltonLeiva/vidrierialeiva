import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating?: number;
}

export default function TestimonialCard({ name, role, content, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative mt-8 hover:shadow-xl transition-shadow">
      <div className="absolute -top-6 left-8 bg-leiva-amber text-white p-3 rounded-full shadow-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 11L8 17H5L7 11H5V7H10V11ZM19 11L17 17H14L16 11H14V7H19V11Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="flex text-leiva-amber mb-4 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={18} fill={i < rating ? "currentColor" : "none"} className={i >= rating ? "text-gray-300" : ""} />
        ))}
      </div>
      <p className="text-gray-600 mb-6 italic leading-relaxed">&ldquo;{content}&rdquo;</p>
      <div>
        <p className="font-bold text-leiva-blue font-poppins">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}
