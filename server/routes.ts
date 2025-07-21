import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProposalSchema } from "@shared/schema";
import { analyzeProposal } from "./services/gemini";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze proposal endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { content, title, userId } = req.body;
      
      // Validate input
      const validatedData = insertProposalSchema.parse({ content, title });
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Save proposal to storage
      const proposal = await storage.createProposal({
        ...validatedData,
        userId
      });

      // Analyze with Gemini
      const geminiResult = await analyzeProposal(content);

      // Save analysis result
      const analysis = await storage.createAnalysisResult({
        proposalId: proposal.id,
        userId,
        recommendation: geminiResult.recommendation,
        reasoning: geminiResult.reasoning,
        summary: geminiResult.summary,
        keyDetails: geminiResult.keyDetails
      });

      res.json({
        proposal,
        analysis
      });
    } catch (error) {
      console.error("Analysis error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Analysis failed" 
      });
    }
  });

  // Get user's analysis history
  app.get("/api/history/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const history = await storage.getAnalysisResultsByUser(userId);
      res.json(history);
    } catch (error) {
      console.error("History error:", error);
      res.status(500).json({ 
        message: "Failed to fetch history" 
      });
    }
  });

  // Get specific analysis
  app.get("/api/analysis/:proposalId", async (req, res) => {
    try {
      const proposalId = parseInt(req.params.proposalId);
      const analysis = await storage.getAnalysisResult(proposalId);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      res.json(analysis);
    } catch (error) {
      console.error("Get analysis error:", error);
      res.status(500).json({ 
        message: "Failed to fetch analysis" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
