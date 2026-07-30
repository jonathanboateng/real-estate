import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(email: string, otp: string) {
  await resend.emails.send({
    from: "EfieDirect <onboarding@resend.dev>",
    to: email,
    subject: "Verify your EfieDirect account",
    html: `<div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
      <p>This code expires in 10 minutes.</p>
    </div>`,
  });
}
