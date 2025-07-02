"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import VerticalNavbar from "@/components/VerticalNavbar";
import LeftSideBar from "@/components/LeftSideBar";
import RightSidebar from "@/components/RightSidebar";

// Dynamically import ThemeToggleButton to avoid SSR issues
const ThemeToggleButton = dynamic(
  () => import("../components/theme/ThemeToggleButton"),
  {
    ssr: false,
  }
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen ">
            {/*Left panel */}
            <VerticalNavbar />
            <LeftSideBar />

            {/* Main content area */}
            <main className="flex-1 md:p-5 md:px-8  overflow-y-auto">
              {children}
            </main>

            {/* Right panel */}
            <RightSidebar />
            
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
