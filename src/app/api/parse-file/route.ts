import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const name = file.name.toLowerCase();
    let text = "";

    if (name.endsWith(".txt")) {
      text = buffer.toString("utf-8");
    } else if (name.endsWith(".pdf")) {
      text = await extractPdfText(buffer);
    } else if (name.endsWith(".docx") || name.endsWith(".doc")) {
      text = await extractDocxText(buffer);
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Use PDF, DOCX, or TXT." },
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

async function extractDocxText(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.default.extractRawText({ buffer });
  return result.value;
}

async function extractPdfText(buffer: Buffer): Promise<string> {
  try {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const data = new Uint8Array(buffer);
    const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
    const pages: string[] = [];

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const strings: string[] = [];
      for (const item of content.items) {
        if ("str" in item && typeof item.str === "string") {
          strings.push(item.str);
        }
      }
      pages.push(strings.join(" "));
    }

    return pages.join("\n\n");
  } catch (err) {
    console.error("PDF parse fallback error:", err);
    throw new Error("Could not parse PDF. Try converting to TXT or DOCX.");
  }
}
