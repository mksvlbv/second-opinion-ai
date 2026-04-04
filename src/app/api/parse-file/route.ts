import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const name = file.name.toLowerCase();
    let text = "";

    if (name.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else if (name.endsWith(".docx") || name.endsWith(".doc")) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value;
    } else if (name.endsWith(".pdf")) {
      return NextResponse.json(
        { error: "PDF support coming soon. Please convert to DOCX or TXT." },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use DOCX or TXT." },
        { status: 400 }
      );
    }

    const trimmed = text.trim();
    if (!trimmed) {
      return NextResponse.json(
        { error: "Could not extract text from this file." },
        { status: 422 }
      );
    }

    // Limit to ~8000 chars to stay within reasonable prompt size
    const limited = trimmed.length > 8000 ? trimmed.slice(0, 8000) + "\n[...truncated]" : trimmed;

    return NextResponse.json({ text: limited, filename: file.name });
  } catch (error: unknown) {
    console.error("File parse error:", error);
    const message = error instanceof Error ? error.message : "Failed to parse file";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
