
import { GoogleGenAI, Type } from "@google/genai";
import { Track } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAIPlaylist = async (prompt: string): Promise<Partial<Track>[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on this mood/vibe: "${prompt}", suggest 5 fictional or real song ideas. Return them as a JSON array of objects with title, artist, and a fictional album name.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              album: { type: Type.STRING }
            },
            required: ["title", "artist", "album"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};
