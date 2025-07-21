import { pgTable, text, serial, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  content: text("content").notNull(),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  proposalId: serial("proposal_id").references(() => proposals.id).notNull(),
  userId: text("user_id").notNull(),
  recommendation: varchar("recommendation", { length: 10 }).notNull(), // YES or NO
  reasoning: text("reasoning").notNull(),
  summary: text("summary").notNull(),
  keyDetails: jsonb("key_details").notNull(), // JSON object with budgetImpact, duration, riskLevel, category
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProposalSchema = createInsertSchema(proposals).pick({
  content: true,
  title: true,
}).extend({
  content: z.string().min(1, "Proposal content is required").max(5000, "Proposal content must be less than 5000 characters"),
  title: z.string().optional(),
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).pick({
  recommendation: true,
  reasoning: true,
  summary: true,
  keyDetails: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Proposal = typeof proposals.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;

export interface AnalysisResponse {
  proposal: Proposal;
  analysis: AnalysisResult;
}

export interface KeyDetails {
  budgetImpact: string;
  duration: string;
  riskLevel: string;
  category: string;
}
