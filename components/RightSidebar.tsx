"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useSidebar } from "./RightSidebarTrigger";
import { Button } from "./ui/button";


// Dynamic import for ThemeToggleButton
const ThemeToggleButton = dynamic(() => import("./ThemeToggleButton"), {
  ssr: false,
  loading: () => <div className="h-8 w-16 bg-muted rounded animate-pulse" />,
});

export const RightSidebar = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [mounted]);

  const toggleSection = useCallback(
    (section: string) => {
      setExpandedSection(expandedSection === section ? null : section);
    },
    [expandedSection]
  );

  const handleLanguageSelect = useCallback((langCode: string) => {
    setSelectedLanguage(langCode);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isRightSidebarCollapsed && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleRightSidebar}
        />
      )}

      <AnimatePresence>
        {!isRightSidebarCollapsed && (
          <motion.aside
            className={`
              bg-sidebar text-sidebar-foreground flex flex-col border-l relative z-50
              ${
                isMobile
                  ? "fixed top-0 right-0 bottom-0 w-64 max-w-[85vw] shadow-2xl sidebar-mobile safe-area"
                  : "w-64 min-h-screen"
              }
            `}
            initial={{
              x: isMobile ? "100%" : 0,
              width: isMobile ? 256 : 0,
              opacity: isMobile ? 1 : 0,
            }}
            animate={{
              x: 0,
              width: 300,
              height: "100%",
              opacity: 1,
            }}
            exit={{
              x: isMobile ? "100%" : 0,
              width: isMobile ? 256 : 0,
              opacity: isMobile ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 h-12 border-b">
              <div></div>
              
              

              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleRightSidebar}
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 mobile-scroll">
              {/* Theme Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Theme</h3>
                </div>
                <div className="pl-6">
                  <ThemeToggleButton />
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
