"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { resolvedTheme, setTheme, systemTheme } = useTheme();

  // Use system theme as fallback during SSR to avoid hydration issues
  const theme = resolvedTheme || systemTheme || "light";
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    
    
       
          <div className="flex items-center gap-2">
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              
              aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full bg-background transition-transform duration-200 ease-in-out ${
                  isDark ? "translate-x-4" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <Moon className="h-3 w-3 text-foreground" />
                ) : (
                  <Sun className="h-3 w-3 text-foreground" />
                )}
              </div>
            </Switch>
          </div>
     
  );
}