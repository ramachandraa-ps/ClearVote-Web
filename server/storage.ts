import { users, proposals, analysisResults, type User, type InsertUser, type Proposal, type InsertProposal, type AnalysisResult, type InsertAnalysisResult, type AnalysisResponse } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createProposal(proposal: InsertProposal & { userId: string }): Promise<Proposal>;
  createAnalysisResult(analysis: InsertAnalysisResult & { proposalId: number; userId: string }): Promise<AnalysisResult>;
  getProposalsByUser(userId: string): Promise<Proposal[]>;
  getAnalysisResultsByUser(userId: string): Promise<AnalysisResponse[]>;
  getAnalysisResult(proposalId: number): Promise<AnalysisResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private proposals: Map<number, Proposal>;
  private analysisResults: Map<number, AnalysisResult>;
  private currentUserId: number;
  private currentProposalId: number;
  private currentAnalysisId: number;

  constructor() {
    this.users = new Map();
    this.proposals = new Map();
    this.analysisResults = new Map();
    this.currentUserId = 1;
    this.currentProposalId = 1;
    this.currentAnalysisId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createProposal(proposalData: InsertProposal & { userId: string }): Promise<Proposal> {
    const id = this.currentProposalId++;
    const proposal: Proposal = {
      ...proposalData,
      title: proposalData.title || null,
      id,
      createdAt: new Date(),
    };
    this.proposals.set(id, proposal);
    return proposal;
  }

  async createAnalysisResult(analysisData: InsertAnalysisResult & { proposalId: number; userId: string }): Promise<AnalysisResult> {
    const id = this.currentAnalysisId++;
    const analysis: AnalysisResult = {
      ...analysisData,
      id,
      createdAt: new Date(),
    };
    this.analysisResults.set(id, analysis);
    return analysis;
  }

  async getProposalsByUser(userId: string): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(
      (proposal) => proposal.userId === userId,
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getAnalysisResultsByUser(userId: string): Promise<AnalysisResponse[]> {
    const userProposals = await this.getProposalsByUser(userId);
    const results: AnalysisResponse[] = [];
    
    for (const proposal of userProposals) {
      const analysis = Array.from(this.analysisResults.values()).find(
        (a) => a.proposalId === proposal.id
      );
      if (analysis) {
        results.push({ proposal, analysis });
      }
    }
    
    return results.sort((a, b) => b.analysis.createdAt.getTime() - a.analysis.createdAt.getTime());
  }

  async getAnalysisResult(proposalId: number): Promise<AnalysisResult | undefined> {
    return Array.from(this.analysisResults.values()).find(
      (analysis) => analysis.proposalId === proposalId,
    );
  }
}

export const storage = new MemStorage();
