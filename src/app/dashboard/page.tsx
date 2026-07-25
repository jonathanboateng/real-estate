import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "OWNER") {
    return <div className="p-10 text-center">Only Property Owners can view this page.</div>;
  }

  const myProperties = await prisma.property.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="max-w-6xl mx-auto p-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your direct property listings in Ghana.</p>
        </div>
        <div className="space-x-3">
          <Link href="/" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold">Home</Link>
          <Link href="/dashboard/create" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700">+ Add Property</Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Property</th>
              <th className="p-4 font-semibold text-gray-600">Price (GHS)</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {myProperties.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">You haven't added any properties yet.</td>
              </tr>
            ) : (
              myProperties.map((prop) => (
                <tr key={prop.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center gap-3">
                    <div>
                      <p className="font-bold text-gray-900">{prop.title}</p>
                      <p className="text-xs text-gray-500">📍 {prop.location}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-700 font-semibold">GHS {prop.price.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded-full font-semibold bg-green-100 text-green-700">
                      {prop.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
