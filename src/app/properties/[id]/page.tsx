import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import ContactButtons from "@/components/ContactButtons";
import Link from "next/link";

export default async function PropertyDetails({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: { owner: true }
  });

  if (!property) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 pb-24 md:pb-10">
      <div className="bg-white border-b px-6 py-4">
        <Link href="/" className="text-blue-600 font-semibold text-sm">← Back to Search</Link>
      </div>

      <div className="w-full h-64 md:h-96 relative bg-gray-200">
        <Image 
          src={property.images[0] || '/placeholder.jpg'} 
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              <p className="text-gray-500 mt-2">📍 {property.location}</p>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-bold text-blue-600">
                GHS {property.price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 uppercase tracking-wide">For {property.type}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {property.localTags.map(tag => (
              <span key={tag} className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-md border border-green-100">
                {tag}
              </span>
            ))}
          </div>

          <hr className="my-6 border-gray-100" />

          <h2 className="text-xl font-bold mb-3">Property Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="block text-gray-500 text-sm">Bedrooms</span>
              <span className="font-bold text-lg">{property.bedrooms}</span>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border">
              <span className="block text-gray-500 text-sm">Bathrooms</span>
              <span className="font-bold text-lg">{property.bathrooms}</span>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
        </div>
      </div>

      <ContactButtons 
        phone={property.owner.phone} 
        whatsapp={property.owner.whatsapp}
        propertyTitle={property.title}
        location={property.location}
        price={property.price}
      />
    </main>
  );
}
