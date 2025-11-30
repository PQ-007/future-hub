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
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
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
  LogOut,
  Omega,
  Pi,
  Route,
  Sigma,
  UserRound
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

// Define languages structure for consistency
const languages = [
  { code: "en", name: "English", icon: Omega },
  { code: "mn", name: "Монгол", icon: Sigma }, // Sigma could be imported if needed
  { code: "ja", name: "日本語", icon: Pi }, // Origami could be imported if needed
] as const;

// Type alias for user data
type User = {
  name: string;
  email: string;
  avatar: string;
};

// Memoized Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

export function NavUser({ user }: { user: User | null }) {
  const router = useRouter();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const currentLanguage = languages.find((lang) => lang.code === language);

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

  const handleLanguageChange = (code: "en" | "mn" | "ja") => {
    setLanguage(code);
    const selectedLang =
      languages.find((lang) => lang.code === code)?.name || code;
    toast.success("Language Changed", {
      description: `Language set to ${selectedLang}.`,
    });
    setIsLanguageOpen(false);
  };

  if (!user) {
    return (
      <Button className="rounded-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
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
        side="bottom"
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
            <div className="flex flex-col">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => router.push("/profile/user")}
            className="cursor-pointer"
          >
            <div className="flex">
              <UserRound className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/roadmap")}
            className="cursor-pointer"
          >
            <div className="flex">
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
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Language ({currentLanguage?.name || "English"})</span>
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
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <lang.icon className="h-4 w-4" />
                      <span>{lang.name}</span>
                    </div>
                    {language === lang.code && <Check className="h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
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

// Compact language switcher as a standalone export for reuse (e.g., mobile)
export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code as "en" | "mn" | "ja")}
          className={cn(
            "px-2 py-1 rounded-md text-sm font-medium transition-colors",
            language === lang.code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
