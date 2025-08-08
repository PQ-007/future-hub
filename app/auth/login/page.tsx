"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    }
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (event === "SIGNED_IN") {
          router.push("/profile");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function signInWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback", // Update for production
      },
    });
    if (error) {
      console.error("Error initiating Google sign-in:", error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        {!user ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Sign in with your Google account to access the application.
            </p>
            <button
              onClick={signInWithGoogle}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">You are already signed in.</p>
            <button
              onClick={() => router.push("/profile")}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Go to Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
