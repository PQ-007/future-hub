import { useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error retrieving session:", error.message);
        router.push("/");
        return;
      }
      if (data.session) {
        router.push("/profile");
      } else {
        console.error("No session found");
        router.push("/");
      }
    }
    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
