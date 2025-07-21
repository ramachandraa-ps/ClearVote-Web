import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.firebasestorage.app`,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export interface FirebaseProposal {
  id?: string;
  userId: string;
  content: string;
  title?: string;
  createdAt: Timestamp;
}

export interface FirebaseAnalysis {
  id?: string;
  proposalId: string;
  userId: string;
  recommendation: string;
  reasoning: string;
  summary: string;
  keyDetails: any;
  createdAt: Timestamp;
}

export async function saveProposal(proposal: Omit<FirebaseProposal, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "proposals"), {
      ...proposal,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving proposal:", error);
    throw new Error("Failed to save proposal to Firebase");
  }
}

export async function saveAnalysis(analysis: Omit<FirebaseAnalysis, 'id' | 'createdAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "analyses"), {
      ...analysis,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving analysis:", error);
    throw new Error("Failed to save analysis to Firebase");
  }
}

export async function getUserProposals(userId: string): Promise<FirebaseProposal[]> {
  try {
    const q = query(
      collection(db, "proposals"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseProposal));
  } catch (error) {
    console.error("Error getting user proposals:", error);
    throw new Error("Failed to get proposals from Firebase");
  }
}

export async function getUserAnalyses(userId: string): Promise<FirebaseAnalysis[]> {
  try {
    const q = query(
      collection(db, "analyses"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseAnalysis));
  } catch (error) {
    console.error("Error getting user analyses:", error);
    throw new Error("Failed to get analyses from Firebase");
  }
}
