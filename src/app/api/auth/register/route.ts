import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, password, role, phone, whatsapp, gender } = await req.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (role === "SEEKER" && !gender) {
      return NextResponse.json({ error: "Gender is required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "SEEKER",
        phone,
        whatsapp: whatsapp || null,
        gender: role === "SEEKER" ? gender : null,
        emailVerified: false,
        otpCode,
        otpExpiresAt,
      }
    });

    await sendOtpEmail(email, otpCode);

    return NextResponse.json({ message: "User created, OTP sent", userId: user.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
