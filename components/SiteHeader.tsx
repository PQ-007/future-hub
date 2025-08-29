"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { NavUser } from "./NavUser";
import { Input } from "./ui/input";

// Utility function to format breadcrumb segments
const formatSegment = (segment: string) =>
  segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const userData = {
    name: user?.user_metadata?.name || "Guest",
    email: user?.email || "",
    avatar: user?.user_metadata?.avatar_url || "",
  };

  // Generate breadcrumb items
  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      return { segment, path, isLast: index === array.length - 1 };
    });

  return (
    <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-4 border-b bg-background/95 px-4 transition-all ease-linear supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="flex w-full items-center justify-between gap-4">
       <SidebarTrigger/>

       

      


        {/* User Actions */}
        <div className="flex items-center gap-2">
          <Separator
            orientation="vertical"
            className="hidden md:block h-6"
            aria-hidden="true"
          />
          {user ? (
            <NavUser user={userData} />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/signin")}
            >
              <span className="text-sm ">Sign in</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}