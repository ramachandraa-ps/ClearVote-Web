import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Using hardcoded values instead of environment variables
// In a production environment, these would come from .env files
const firebaseConfig = {
  apiKey: "your-firebase-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  appId: "your-firebase-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app; 