import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateArticleDraft(title, category) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // ✅ using gemini-2.5-flash as you asked
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Write a short encyclopedia-style article.

Title: ${title}
Category: ${category || "General"}

Rules:
- 3–5 paragraphs
- clear explanation
- neutral tone
- no markdown
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    return text;
  } catch (err) {
    console.error("GEMINI ERROR:", err);
    throw err;
  }
}