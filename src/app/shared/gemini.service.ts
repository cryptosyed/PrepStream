import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Flashcard {
  question: string;
  answer: string;
}

export interface GeminiResponse {
  summary: string;
  flashcards: Flashcard[];
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  async getSummaryAndFlashcards(text: string): Promise<GeminiResponse> {
    const apiKey = environment.geminiApiKey;
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
      throw new Error("Gemini API key is not set in environment.ts. Please add your key to proceed.");
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert study assistant. Based on the following text, provide a concise, easy-to-read summary and generate 5-10 high-quality flashcards.

    **Instructions for Flashcards:**
    - Questions should target key concepts, definitions, and important facts.
    - Answers should be clear, concise, and directly address the question.
    - Avoid overly simple or trivial questions.
    - Frame questions as a real student would for effective studying.

    **Example:**
    - Text: "The mitochondria is the powerhouse of the cell, responsible for generating ATP through cellular respiration."
    - Good Question: "What is the primary function of mitochondria?"
    - Good Answer: "To generate most of the cell's supply of ATP (adenosine triphosphate) through cellular respiration."

    **Input Text:**
    ---
    ${text}
    ---
    
    Return the result ONLY as a JSON object following this exact schema. Do not include any other text, markdown formatting, or explanations.`;
    // ^^^ END OF PROMPT ^^^

    const payload = {
        contents: [{
            role: "user",
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    summary: { type: "STRING" },
                    flashcards: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                question: { type: "STRING" },
                                answer: { type: "STRING" }
                            },
                            required: ["question", "answer"]
                        }
                    }
                },
                required: ["summary", "flashcards"]
            }
        }
    };

    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }
        
        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const parsedJson = JSON.parse(result.candidates[0].content.parts[0].text);
            return parsedJson;
        } else {
            console.error("Unexpected API response structure:", result);
            throw new Error("Failed to parse the response from the AI. The structure was unexpected.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
  }
}