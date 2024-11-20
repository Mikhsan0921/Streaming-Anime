"use client";

import { getCookieValue } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  userProfile: any;
  setUserProfile: (profile: any) => void;
  updateUserProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const profileCookie = getCookieValue("authToken");

    if (profileCookie) {
      try {
        const parsedProfile = JSON.parse(profileCookie);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error("Failed to parse cookie:", error);
      }
    }
  }, []);

  const updateUserProfile = () => {
    const profileCookie = getCookieValue("reads-profile");
    const newProfile = profileCookie ? JSON.parse(profileCookie) : null;

    if (JSON.stringify(newProfile) !== JSON.stringify(userProfile)) {
      setUserProfile(newProfile);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userProfile, setUserProfile, updateUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
