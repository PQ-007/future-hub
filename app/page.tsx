"use client";

import { useAuth } from "@/contexts/AuthContext";
import DashboardPage from "@/pages/DashboardPage";
import LandingPage from "@/pages/LandingPage";
import { useState } from "react";

// Define the User type to match the previous NavUser component
type User = {
  name: string;
  email: string;
  avatar: string;
} | null;

export default function HomePage() {
  const [lang, setLang] = useState<"ENG" | "MGL" | "JP">("ENG");
  const user = useAuth(); 
  const isAuthenticated = user.user !== null;

  return (
    <>
      {isAuthenticated ? (
          <DashboardPage />
      ) : (
        <div className="space-y-16">
          <LandingPage setLang={setLang} lang={lang} />
        </div>
      )}
    </>
  );
}