// components/SiteHeader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import CreateButton from "./button-collection/CreateButton";
import NotificationButton from "./button-collection/NotificationButton";
import SearchButton from "./button-collection/SearchButton";
import ThemeToggleButton from "./button-collection/ThemeToggleButton";

import { NavUser } from "./NavUser";

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
  const { t } = useLanguage();
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
        <SidebarTrigger />
        
        <div className="flex items-center space-x-2 text-sm font-medium">
          <SearchButton />

          <ThemeToggleButton />

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
               
                <CreateButton />
                <NotificationButton />
                <NavUser user={userData} />
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/signin")}
              >
                <span className="text-sm">{t("auth.signIn")}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
