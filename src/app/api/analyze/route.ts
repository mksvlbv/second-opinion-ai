import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { context, details, focus } = await req.json();

    if (!context || context.trim().length === 0) {
      return NextResponse.json({ error: "No context provided." }, { status: 400 });
    }

    const systemPrompt = `You are a clinical reasoning assistant for a product called "Second Opinion AI". Your role is to provide structured, educational analysis of patient-described symptoms. You are NOT providing medical advice or diagnosis — you are generating a structured clinical reasoning brief that helps patients prepare for conversations with their doctors.

Respond ONLY with valid JSON in this exact format:
{
  "summary": "Short 4-8 word clinical summary headline",
  "summaryDesc": "1-2 sentence description of what the symptom pattern suggests, written in third person",
  "confidence": "One of: High Alignment, Moderate-High Alignment, Moderate Alignment",
  "basis": ["Analysis method 1", "Analysis method 2", "Analysis method 3"],
  "observations": ["Observation 1 (concise, clinical tone)", "Observation 2", "Observation 3"],
  "interpretation": [
    {"label": "Consistent with", "title": "Most likely category", "desc": "Brief explanation"},
    {"label": "Possible", "title": "Secondary consideration", "desc": "Brief explanation"},
    {"label": "Less likely", "title": "Ruled-out category", "desc": "Brief explanation"}
  ],
  "significance": "One powerful sentence about why further evaluation matters for this case",
  "questions": ["Question for physician 1", "Question for physician 2", "Question for physician 3"]
}

Guidelines:
- Be clinical but accessible. Use medical terminology with plain-language context.
- Never state a definitive diagnosis. Use phrases like "consistent with", "suggests", "warrants evaluation".
- Make observations specific to the provided symptoms, not generic.
- Questions should be actionable and specific to the case.
- Keep the tone authoritative but empathetic.`;

    const userMessage = [
      `Patient-described symptoms: ${context}`,
      details ? `Additional details: ${details}` : "",
      focus ? `Patient's primary concern: ${focus}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Empty response from AI." }, { status: 500 });
    }

    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Analysis API error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
