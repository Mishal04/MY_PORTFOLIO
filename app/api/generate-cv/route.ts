import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");

    if (!fs.existsSync(filePath)) {
      return new Response("Resume file not found", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Mishal_Ashfaq_Resume.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error serving resume PDF:", error);
    return new Response("Error loading resume PDF", { status: 500 });
  }
}

