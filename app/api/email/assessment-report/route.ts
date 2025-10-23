// app/api/email/assessment-report/route.ts
import { NextRequest, NextResponse } from "next/server";

type EmailBody = { email: unknown };

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as EmailBody;

  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "VALISCI <no-reply@valisci.com>";
  const cal = process.env.NEXT_PUBLIC_CALENDAR_URL || "#";

  if (!key) {
    // Safe no-op mode for local/preview
    console.log("[Email fallback] Would send report to:", email);
    return NextResponse.json({ ok: true, mode: "noop" });
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Your VALISCI Confidence Assessment Report",
        html: `
          <p>Your report is ready.</p>
          <p>We recommend a 15-minute Executive Induction to translate score → action.</p>
          <p><a href="${cal}">Book your 15-minute induction</a></p>
        `,
      }),
    });
    return NextResponse.json({ ok: true, mode: "resend" });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
