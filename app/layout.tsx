"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RightSidebar, RightSidebarProvider } from "@/components/RightSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { LeftSidebar } from "@/components/LeftSidebar";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en" className={cn("dark h-full")} suppressHydrationWarning>
      <body className="h-full">
        <RightSidebarProvider>
          <SidebarProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <div className="flex w-full flex-col md:flex-row h-full">
                <LeftSidebar />
                <main className="flex-1 h-full">
                  <SiteHeader />
                  <div className="flex-1 md:p-5 md:px-8 overflow-y-auto">
                    {children}
                  </div>
                </main>
                <RightSidebar />
              </div>
            </ThemeProvider>
          </SidebarProvider>
        </RightSidebarProvider>
      </body>
    </html>
  );
}
