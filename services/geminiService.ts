import { GoogleGenAI, Chat, GroundingChunk } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateVibeDescription = async (
  features: string[],
  imageBase64: string,
  mimeType: string
): Promise<string> => {
  try {
    const featureText = features.join(', ');
    const prompt = `Based on the following features: ${featureText} and the provided image, write a short, evocative, and stylish description of the "vibe" of this property. Focus on the feeling and lifestyle, not just the features. Make it sound luxurious and appealing.`;
    
    const imagePart = {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    };
    const textPart = { text: prompt };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating vibe description:", error);
    return "Could not generate a vibe description at this time. Please try again later.";
  }
};

export const generateMarketSummary = async (
    city: string
): Promise<{ summary: string; sources: GroundingChunk[] }> => {
    try {
        const prompt = `Provide a concise, insightful real estate market summary for ${city}. Include key trends like price changes, inventory levels, and demand. Format the output as a single paragraph.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });

        const summary = response.text;
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        return { summary, sources };
    } catch (error) {
        console.error("Error generating market summary:", error);
        return {
            summary: "Could not generate a market summary at this time. Please try again later.",
            sources: []
        };
    }
};

export const startConciergeChat = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are a friendly and helpful real estate concierge for 'Dream Escape'. Your goal is to assist users in finding their perfect home. You have access to our listings and can answer questions about the market. Be professional, personable, and concise.",
            tools: [{ googleSearch: {}, googleMaps: {} }],
        },
    });
};