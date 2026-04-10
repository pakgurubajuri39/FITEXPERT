import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askExpert(bodyType: string, plan: string, question: string, age?: string, weight?: string, height?: string) {
  const prompt = `
    Anda adalah pakar nutrisi dan pelatih kebugaran profesional.
    Pengguna memiliki tipe tubuh: ${bodyType}.
    ${age ? `Umur: ${age} tahun.` : ''}
    ${weight ? `Berat Badan: ${weight} kg.` : ''}
    ${height ? `Tinggi Badan: ${height} cm.` : ''}
    Berikut adalah rencana mereka:
    ${plan}

    Pertanyaan Pengguna: ${question}

    Berikan jawaban yang profesional, mendukung, dan praktis dalam Bahasa Indonesia. 
    Gunakan format markdown yang rapi.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "Maaf, saya tidak bisa memberikan jawaban saat ini.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, saya sedang tidak bisa menjawab saat ini. Silakan coba lagi nanti.";
  }
}
