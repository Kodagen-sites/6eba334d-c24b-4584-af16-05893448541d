import { NextResponse } from "next/server";

/**
 * Static-landing contact endpoint. Accepts a JSON body, logs it, returns 200.
 * In a real deploy, swap the console.log for a Resend / SES / Slack webhook.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[contact]", body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }
}
