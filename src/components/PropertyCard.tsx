import Image from 'next/image';
import Link from 'next/link';

type PropertyProps = {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "RENT" | "BUY";
  bedrooms: number;
  image: string;
  localTags: string[];
};

export default function PropertyCard({ property }: { property: PropertyProps }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full bg-gray-200">
        <Image 
          src={property.image && property.image.startsWith('http') ? property.image : '/placeholder.jpg'} 
          alt={property.title} 
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          For {property.type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{property.title}</h3>
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          📍 {property.location}
        </p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {property.localTags.map(tag => (
            <span key={tag} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-md border border-green-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">GHS {property.price.toLocaleString()}</span>
          <span className="text-sm text-gray-600">{property.bedrooms} Beds</span>
        </div>
      </div>
    </Link>
  );
}
