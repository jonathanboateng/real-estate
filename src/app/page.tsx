import prisma from "@/lib/prisma";
import PropertyCard from "@/components/PropertyCard";
import SearchFilter from "@/components/SearchFilter";
import Link from "next/link";

export default async function Home({ searchParams }: { searchParams: { location?: string, type?: string } }) {
  const where: any = { status: "AVAILABLE" };
  if (searchParams.location) where.location = { contains: searchParams.location, mode: 'insensitive' };
  if (searchParams.type) where.type = searchParams.type;

  const properties = await prisma.property.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <span className="font-bold text-lg">🇬🇭 GhanaDirect Homes</span>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-sm bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700">Owner Portal</Link>
          <Link href="/login" className="text-sm bg-white text-blue-900 font-semibold px-4 py-2 rounded-lg">Login</Link>
        </div>
      </nav>

      <div className="bg-blue-900 text-white py-20 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Direct Property in Ghana. No Middlemen.</h1>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">Connect directly with homeowners and estate managers across Sunyani, Accra, and Kumasi.</p>
      </div>

      <div className="px-4">
        <SearchFilter />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full py-10">No properties found matching your criteria.</p>
        ) : (
          properties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={{
                id: property.id,
                title: property.title,
                price: property.price,
                location: property.location,
                type: property.type as "RENT" | "BUY",
                bedrooms: property.bedrooms,
                image: property.images[0] || '',
                localTags: property.localTags
              }} 
            />
          ))
        )}
      </div>
    </main>
  );
}
