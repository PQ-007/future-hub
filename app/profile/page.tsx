// app/profile/page.tsx
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  return <div>Welcome, {user.email}!</div>;
}