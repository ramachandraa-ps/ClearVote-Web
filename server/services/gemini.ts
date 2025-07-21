import { GoogleGenAI } from "@google/genai";
import type { KeyDetails } from "@shared/schema";

// Directly use the API key instead of environment variable
const ai = new GoogleGenAI({ apiKey: "AIzaSyCxd8DzCzk70xZY1kVr_lZdj9Ns8VYK1co" });

export interface GeminiAnalysisResponse {
  recommendation: "YES" | "NO";
  reasoning: string;
  summary: string;
  keyDetails: KeyDetails;
}

export async function analyzeProposal(proposalContent: string): Promise<GeminiAnalysisResponse> {
  try {
    const systemPrompt = `You are a DAO governance expert. Analyze the following proposal and provide:
1. A clear YES or NO recommendation for voting
2. Brief reasoning for your recommendation (2-3 sentences)
3. A concise summary of the proposal (key points in 3-4 sentences)
4. Key details including:
   - budgetImpact: Financial impact (e.g., "+500K TOKENS", "No Impact", "-100K USD")
   - duration: Time period (e.g., "3 Months", "Ongoing", "One-time")
   - riskLevel: Risk assessment ("Low", "Medium", "High")
   - category: Proposal type (e.g., "Funding", "Governance", "Technical", "Partnership")

Respond with JSON in this exact format:
{
  "recommendation": "YES" or "NO",
  "reasoning": "Brief explanation",
  "summary": "Concise summary",
  "keyDetails": {
    "budgetImpact": "string",
    "duration": "string", 
    "riskLevel": "string",
    "category": "string"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            recommendation: { 
              type: "string",
              enum: ["YES", "NO"]
            },
            reasoning: { type: "string" },
            summary: { type: "string" },
            keyDetails: {
              type: "object",
              properties: {
                budgetImpact: { type: "string" },
                duration: { type: "string" },
                riskLevel: { 
                  type: "string",
                  enum: ["Low", "Medium", "High"]
                },
                category: { type: "string" }
              },
              required: ["budgetImpact", "duration", "riskLevel", "category"]
            }
          },
          required: ["recommendation", "reasoning", "summary", "keyDetails"]
        }
      },
      contents: `${systemPrompt}\n\nProposal:\n${proposalContent}`
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const data: GeminiAnalysisResponse = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error(`Failed to analyze proposal: ${error}`);
  }
}
