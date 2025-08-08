"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import type { User } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  id: string;
  email: string;
  name: string | null;
  updated_at: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndProfile() {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        console.error("Error retrieving session:", sessionError?.message);
        router.push("/");
        return;
      }

      const currentUser = sessionData.session.user;
      setUser(currentUser);

      // Check if profile exists, create if not
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("Error fetching profile:", profileError.message);
      } else if (!profileData) {
        // Create profile if it doesn't exist
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: currentUser.id,
            email: currentUser.email!,
            name: currentUser.user_metadata?.full_name || null,
          },
        ]);
        if (insertError) {
          console.error("Error creating profile:", insertError.message);
        } else {
          setProfile({
            id: currentUser.id,
            email: currentUser.email!,
            name: currentUser.user_metadata?.full_name || null,
            updated_at: new Date().toISOString(),
          });
        }
      } else {
        setProfile(profileData);
      }

      setLoading(false);
    }

    fetchUserAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          router.push("/");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-600">Error: User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">User Profile</h1>
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span> {profile.email}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Name:</span>{" "}
            {profile.name || "Not provided"}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Last Updated:</span>{" "}
            {new Date(profile.updated_at).toLocaleString()}
          </p>
          <button
            onClick={signOut}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
