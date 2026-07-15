import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body as {
      name: string;
      email: string;
      message: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Log submission server-side (replace with your preferred email/DB service)
    console.info("[Contact form submission]", { name, email, message });

    // TODO: wire up your preferred email service here, e.g.:
    //   await resend.emails.send({ from, to, subject, html })
    // For now we return success so the UI stays fully functional.
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission." },
      { status: 500 }
    );
  }
}
