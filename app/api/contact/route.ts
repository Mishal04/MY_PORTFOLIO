import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to yourself (notification)
    const adminMailOptions = {
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #1f2937;">New Contact Form Submission</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 4px;">
              ${escapeHtml(message)}
            </p>
          </div>
          <p style="color: #6b7280; margin-top: 20px; font-size: 12px;">
            This is an automated message from your portfolio contact form.
          </p>
        </div>
      `,
    };

    // Email to sender (confirmation)
    const senderMailOptions = {
      from: process.env.CONTACT_EMAIL_FROM,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #4f46e5;">Thank you, ${escapeHtml(name)}!</h2>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap;">
              ${escapeHtml(message)}
            </p>
          </div>
          <p>Best regards,<br>Mishal Ashfaq</p>
          <p style="color: #6b7280; margin-top: 20px; font-size: 12px;">
            This is an automated confirmation email.
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(senderMailOptions);

    console.info("[Contact form submission sent]", { name, email });

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Contact form error]", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
