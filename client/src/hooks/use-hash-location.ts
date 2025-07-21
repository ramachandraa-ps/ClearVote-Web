import { useState, useEffect, useCallback } from "react";

// A custom hook that uses hash-based routing with wouter
export const useHashLocation = (): [
  string,
  (to: string) => void
] => {
  // Get the hash location (excluding the #)
  const getHashLocation = () => {
    const hash = window.location.hash;
    return hash ? hash.substring(1) : "/";
  };

  const [location, setLocation] = useState(getHashLocation());

  // Update location when the hash changes
  useEffect(() => {
    // Handle hash change
    const handleHashChange = () => {
      setLocation(getHashLocation());
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigate to a new location
  const navigate = useCallback((to: string) => {
    window.location.hash = to;
  }, []);

  return [location, navigate];
};

export default useHashLocation; 