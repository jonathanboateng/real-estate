import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (user.emailVerified) return NextResponse.json({ message: "Already verified" }, { status: 200 });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otpCode, otpExpiresAt }
    });

    await sendOtpEmail(email, otpCode);

    return NextResponse.json({ message: "OTP resent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
