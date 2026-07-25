import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");
  const type = searchParams.get("type");

  const filter: any = { status: "AVAILABLE" };
  if (location) filter.location = { contains: location, mode: "insensitive" };
  if (type) filter.type = type;

  try {
    const properties = await prisma.property.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "OWNER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const property = await prisma.property.create({
      data: {
        title: body.title,
        description: body.description,
        price: parseFloat(body.price),
        location: body.location,
        type: body.type,
        bedrooms: parseInt(body.bedrooms),
        bathrooms: parseInt(body.bathrooms),
        amenities: body.amenities || [],
        images: body.images || [],
        localTags: body.localTags || [],
        ownerId: session.user.id
      }
    });
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}
