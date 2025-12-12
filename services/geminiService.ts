import { GoogleGenAI, Schema, Type } from "@google/genai";
import { DestinationDetails, DayPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Schemas ---

const destinationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    description: { type: Type.STRING },
    weather: { type: Type.STRING },
    bestTime: { type: Type.STRING },
    visaRequirements: { type: Type.STRING },
    culturalTips: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING } 
    },
  },
  required: ["description", "weather", "bestTime", "visaRequirements", "culturalTips"]
};

const itinerarySchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      day: { type: Type.INTEGER },
      activities: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING },
            activity: { type: Type.STRING },
            type: { type: Type.STRING, enum: ['sightseeing', 'food', 'adventure', 'relax'] }
          }
        }
      }
    }
  }
};

// --- API Calls ---

export const getDestinationDetails = async (destination: string): Promise<DestinationDetails> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a travel guide for ${destination}. Return strictly JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: destinationSchema,
      },
    });
    
    if (response.text) {
      return JSON.parse(response.text) as DestinationDetails;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

export const generateItinerary = async (destination: string, days: number, interests: string): Promise<DayPlan[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a ${days}-day itinerary for ${destination} focusing on: ${interests}. Return strictly JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      },
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      // Add IDs for React keys
      return rawData.map((day: any) => ({
        ...day,
        activities: day.activities.map((act: any) => ({ ...act, id: Math.random().toString(36).substr(2, 9) }))
      }));
    }
    throw new Error("No itinerary generated");
  } catch (error) {
    console.error("Gemini Itinerary Error:", error);
    throw error;
  }
};

export const getVibeMatch = async (vibe: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 3 travel destinations that match this vibe: "${vibe}". Return only a JSON array of strings (names of places).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
        }
      }
    });
    if (response.text) return JSON.parse(response.text);
    return [];
  } catch (error) {
    return ["Paris", "Kyoto", "Bali"]; // Fallback
  }
};

export const analyzeLandmark = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image", // Using vision model
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: "Identify this landmark and provide 3 interesting historical facts about it. Keep it concise." }
        ]
      }
    });
    return response.text || "Could not identify landmark.";
  } catch (error) {
    console.error("Vision Error:", error);
    return "Error analyzing image.";
  }
};

export const chatWithAi = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
    // Note: For simplicity in this demo, we use a new chat instance or stateless generation mostly.
    // Ideally, pass the history to ai.chats.create
    const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        history: history,
        config: {
            systemInstruction: "You are a helpful, knowledgeable travel assistant. Keep answers concise and practical."
        }
    });
    
    const result = await chat.sendMessageStream({ message });
    return result;
}