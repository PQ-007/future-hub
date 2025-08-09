"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, LogOut, Edit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@supabase/supabase-js";

export default function ProfilePage() {
  const { user } = useAuth(); // Assume useAuth provides a signOut function
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  // User data extraction
  const userData = {
    name: user?.user_metadata?.name || "Guest",
    email: user?.email || "Not provided",
    avatar: user?.user_metadata?.avatar_url || "",
  };
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Redirect to sign-in if no user is authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/signin");
    }
    setIsLoading(false);
  }, [user, router, isLoading]);

  // Handle sign-out
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut(); // Assume signOut is an async function from useAuth
      router.push("/signin");
    } catch (error) {
      console.error("Sign-out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading profile" />
      </div>
    );
  }

  // Unauthenticated state (handled by useEffect, but added for clarity)
  if (!user) {
    return null; // useEffect will redirect to /signin
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="shadow-lg border-none">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="text-2xl">
              {userData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-semibold text-center">
            {userData.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-base text-foreground" aria-label={`Email: ${userData.email}`}>
                  {userData.email}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-muted transition-colors"
              onClick={() => router.push("/profile/edit")} // Placeholder for edit profile route
              aria-label="Edit profile"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2 hover:bg-destructive/90 transition-colors"
              onClick={handleSignOut}
              disabled={isSigningOut}
              aria-label="Sign out"
            >
              {isSigningOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="h-4 w-4" />
              )}
              {isSigningOut ? "Signing Out..." : "Sign Out"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}