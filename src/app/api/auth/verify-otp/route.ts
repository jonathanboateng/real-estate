import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ message: "Already verified" }, { status: 200 });
    }

    if (!user.otpCode || !user.otpExpiresAt) {
      return NextResponse.json({ error: "No code found, please register again" }, { status: 400 });
    }

    if (user.otpCode !== otp) {
      return NextResponse.json({ error: "Incorrect code" }, { status: 400 });
    }

    if (new Date() > user.otpExpiresAt) {
      return NextResponse.json({ error: "Code expired, please request a new one" }, { status: 400 });
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true, otpCode: null, otpExpiresAt: null }
    });

    return NextResponse.json({ message: "Email verified" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
