"use client";

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
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { createClient } from "@supabase/supabase-js";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Languages,
  LogOut,
  Origami,
  Route,
  Sigma,
  UserRound,
  Wrench
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ThemeToggleButton from "./ThemeToggleSwitch";
import { Button } from "./ui/button";

// Using a type alias for better clarity and potential future extension
type User = {
  name: string;
  email: string;
  avatar: string;
};

// Memoizing Supabase client creation is a good practice to avoid re-initialization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export function NavUser({ user }: { user: User | null }) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Use a useEffect hook to handle side effects like checking environment variables
  // This ensures the check runs only on the client-side after the component mounts
  // and separates concerns from the component's render logic.
  // ... (Original useEffect logic from the provided code) ...

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Signed Out", {
        description: "You have been successfully signed out.",
      });
      router.push("/");
    } catch (error) {
      console.error("Sign-out failed:", error);
      toast.error("Sign-out failed", {
        description: "An error occurred during sign-out. Please try again.",
      });
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    toast.success("Language Changed", {
      description: `Language set to ${language}.`,
    });
    setIsLanguageOpen(false); // Close collapsible after selection
  };

  if (!user) {
    return (
      <Button
        className={
          "rounded-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        }
      >
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarFallback className="rounded-full">
            <UserRound className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label={`User menu for ${user.name}`}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-56"
        side={"bottom"}
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal p-0">
          <div className="flex items-center gap-2 px-3 py-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none truncate">
                {user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup >
          <DropdownMenuItem
            onClick={() => router.push("/profile/user")}
            className="cursor-pointer"
          >
            <div className="flex ">
              <UserRound className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/roadmap")}
            className="cursor-pointer"
          >
            <div className="flex ">
              <Route className="mr-2 h-4 w-4" />
              <span>Roadmap</span>
            </div>
          </DropdownMenuItem>


          <Collapsible open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
            <CollapsibleTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer flex items-center justify-between w-full"
                onSelect={(e) => e.preventDefault()} 
              >
                <div className="flex items-center">
                  <Languages className="mr-2 h-4 w-4" />
                  <span>Language ({selectedLanguage})</span>
                </div>
                {isLanguageOpen ? (
                  <ChevronUp className="ml-auto h-4 w-4 shrink-0" />
                ) : (
                  <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
                )}
              </DropdownMenuItem>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col space-y-1 py-1 pl-8 pr-2">
                {["English", "Монгол", "日本語"].map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {lang === "English" && <Globe className="h-4 w-4" />}
                      {lang === "Монгол" && <Sigma className="h-4 w-4" />}
                      {lang === "日本語" && <Origami className="h-4 w-4" />}
                      <span>{lang}</span>
                    </div>
                    {selectedLanguage === lang && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <DropdownMenuItem className="cursor-pointer flex justify-between items-center">
            <div className="flex items-center">
              <Wrench className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </div>
            <ThemeToggleButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
