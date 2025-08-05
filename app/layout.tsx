"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { RightSidebar, RightSidebarProvider } from "@/components/RightSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LeftSidebar } from "@/components/LeftSideBar";

const ThemeToggleButton = dynamic(
  () => import("../components/theme/ThemeToggleButton"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check for mobile screen size
  useEffect(() => {
    if (!mounted) return;
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <html lang="en" className={cn("dark h-full")} suppressHydrationWarning>
        <body className={cn(inter.className, "h-full overflow-hidden")}>
          <div className="flex h-full w-full">
            <div className="flex-1 flex flex-col">
              <div className="h-12 border-b bg-background"></div>
              <main className="flex-1 overflow-y-auto">
                <div className="h-full p-4 md:p-6 lg:p-8">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={cn("dark h-full")} suppressHydrationWarning>
      <body className={cn(inter.className, "h-full overflow-hidden")}>
        <RightSidebarProvider>
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
              storageKey="theme-preference"
            >
              <div className="flex h-full w-full">
                {/* Left Sidebar - Hidden on mobile unless opened */}
                <div className="hidden md:block">
                  <LeftSidebar />
                </div>
                
                {/* Mobile Left Sidebar Overlay */}
                <div className="md:hidden">
                  <LeftSidebar />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-1 flex-col min-w-0">
                  <SiteHeader />
                  
                  {/* Main Content */}
                  <main className="flex-1 overflow-y-auto">
                    <div className="h-full p-4 md:p-6 lg:p-8">
                      {children}
                    </div>
                  </main>
                </div>

                {/* Right Sidebar - Show on all screen sizes but with different behavior */}
                <RightSidebar />
              </div>
            </ThemeProvider>
          </SidebarProvider>
        </RightSidebarProvider>
      </body>
    </html>
  );
}