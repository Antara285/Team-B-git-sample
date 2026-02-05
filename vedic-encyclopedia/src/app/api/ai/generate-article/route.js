import { generateArticleDraft } from "@/lib/ai/gemini";

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, category } = body;

    if (!title) {
      return Response.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const content = await generateArticleDraft(title, category);

    return Response.json({ content });
  } catch (err) {
    console.error("AI ERROR:", err);

    return Response.json(
      { error: "Failed to generate draft" },
      { status: 500 }
    );
  }
}