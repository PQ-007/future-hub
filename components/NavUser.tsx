"use client";

import { BadgeCheck, Check, Globe, LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { createClient } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleSwitch";
import { toast } from "sonner";
import { Button } from "./ui/button";

// Define User interface for type safety
interface User {
  name: string;
  email: string;
  avatar: string;
}

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Handle sign-out with error handling
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed Out", {
        description: "You have been successfully signed out.",
      });
      redirect("/");
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Error", {
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  // Handle language selection
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    toast.success("Language Changed", {
      description: `Language set to ${language}.`,
    });
    setIsLanguageOpen(false); // Close collapsible on selection
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className={`rounded-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${
              isMobile ? "h-10 w-10" : "h-8 w-8"
            }`}
            aria-label={`User menu for ${user.name}`}
          >
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-full">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={`w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg ${
            isMobile ? "min-w-64" : ""
          }`}
          side={isMobile ? "top" : "bottom"}
          align="end"
          sideOffset={8}
          aria-labelledby="user-menu"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar
                className={
                  isMobile ? "h-10 w-10 rounded-full" : "h-8 w-8 rounded-full"
                }
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-full">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push("/profile/user")}
              className="text-sm cursor-pointer hover:bg-muted"
            >
              <UserRound className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm cursor-pointer hover:bg-muted">
              <Collapsible
                open={isLanguageOpen}
                onOpenChange={setIsLanguageOpen}
              >
                <CollapsibleTrigger className="text-sm cursor-pointer  flex items-center w-full ">
                  <Globe className="mr-2 h-4 w-4" />
                  Language
                </CollapsibleTrigger>
                <CollapsibleContent className=" shadow-md rounded-md mt-1 pl-6">
                  {["English", "Монгол", "日本語"].map((lang) => (
                    <div
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className="text-sm cursor-pointer px-2 py-1.5 hover:bg-muted flex items-center"
                    >
                      {lang}
                      {selectedLanguage === lang && (
                        <Check className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm cursor-pointer hover:bg-muted">
              Theme
              <ThemeToggleButton />
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="text-sm cursor-pointer hover:bg-muted"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
