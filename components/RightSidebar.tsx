"use client";
import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Globe, Palette, Brain, ChevronRight, PanelRightIcon, X } from "lucide-react";
import { Button } from "./ui/button";

// Dynamic import for ThemeToggleButton to prevent SSR issues
const ThemeToggleButton = dynamic(
  () => import("./theme/ThemeToggleButton"),
  { 
    ssr: false,
    loading: () => <div className="h-8 w-16 bg-muted rounded animate-pulse" />
  }
);

const languages = [
  { code: "mn", name: "Монгол", flag: "🇲🇳", active: false },
  { code: "en", name: "English", flag: "🇺🇸", active: true },
  { code: "jp", name: "日本語", flag: "🇯🇵", active: false },
];

const RightSidebarContext = createContext({
  isRightSidebarCollapsed: false,
  toggleRightSidebar: () => {},
});

const RightSidebarProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(true); // Start collapsed

  const toggleRightSidebar = useCallback(() => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  }, [isRightSidebarCollapsed]);

  return (
    <RightSidebarContext.Provider
      value={{ isRightSidebarCollapsed, toggleRightSidebar }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
};

const useSidebar = () => useContext(RightSidebarContext);

const RightSidebar = () => {
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
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [mounted]);

  const toggleSection = useCallback((section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  }, [expandedSection]);

  const handleLanguageSelect = useCallback((langCode: string) => {
    setSelectedLanguage(langCode);
  }, []);

  // Don't render until mounted to prevent hydration issues
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
              bg-sidebar text-sidebar-foreground flex h-full flex-col border-l relative z-50
              ${isMobile 
                ? 'fixed top-0 right-0 bottom-0 w-64 max-w-[85vw] shadow-2xl' 
                : 'static w-64'
              }
            `}
            initial={{ 
              x: isMobile ? '100%' : 0, 
              width: isMobile ? 256 : 0, 
              opacity: isMobile ? 1 : 0 
            }}
            animate={{ 
              x: 0, 
              width: 256, 
              opacity: 1 
            }}
            exit={{ 
              x: isMobile ? '100%' : 0, 
              width: isMobile ? 256 : 0, 
              opacity: isMobile ? 1 : 0 
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 h-12 border-b">
              <h2 className="text-lg font-semibold text-foreground">
                Settings
              </h2>
              <button
                onClick={toggleRightSidebar}
                className="p-1 rounded-md hover:bg-muted transition-colors touch-target"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
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

              {/* Language Section */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('language')}
                  className="flex items-center gap-2 w-full text-left hover:text-accent-foreground transition-colors touch-target"
                >
                  <Globe className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Language</h3>
                  <ChevronRight 
                    className={`w-4 h-4 ml-auto transition-transform ${
                      expandedSection === 'language' ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSection === 'language' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-2 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSelect(lang.code)}
                          className={`flex items-center gap-3 w-full p-3 rounded-md text-sm transition-colors touch-target ${
                            selectedLanguage === lang.code
                              ? 'bg-accent text-accent-foreground'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {selectedLanguage === lang.code && (
                            <div className="w-2 h-2 bg-primary rounded-full ml-auto" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* AI Assistant Section */}
              <div className="space-y-3">
                <button
                  onClick={() => toggleSection('ai')}
                  className="flex items-center gap-2 w-full text-left hover:text-accent-foreground transition-colors touch-target"
                >
                  <Brain className="w-4 h-4" />
                  <h3 className="text-sm font-medium">AI Assistant</h3>
                  <ChevronRight 
                    className={`w-4 h-4 ml-auto transition-transform ${
                      expandedSection === 'ai' ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSection === 'ai' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-6 space-y-3 overflow-hidden"
                    >
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                          Assistant Mode
                        </label>
                        <select className="w-full p-3 text-sm bg-input border border-border rounded-md touch-target">
                          <option>Creative</option>
                          <option>Balanced</option>
                          <option>Precise</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                          Response Length
                        </label>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-xs bg-accent text-accent-foreground rounded-md touch-target flex-1">
                            Short
                          </button>
                          <button className="px-4 py-2 text-xs bg-muted hover:bg-accent hover:text-accent-foreground rounded-md transition-colors touch-target flex-1">
                            Medium
                          </button>
                          <button className="px-4 py-2 text-xs bg-muted hover:bg-accent hover:text-accent-foreground rounded-md transition-colors touch-target flex-1">
                            Long
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile-specific additional content */}
              {isMobile && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <h3 className="text-sm font-medium">Quick Actions</h3>
                  </div>
                  <div className="space-y-2 pl-6">
                    <button className="w-full p-3 text-sm bg-muted hover:bg-accent hover:text-accent-foreground rounded-md transition-colors touch-target text-left">
                      View Profile
                    </button>
                    <button className="w-full p-3 text-sm bg-muted hover:bg-accent hover:text-accent-foreground rounded-md transition-colors touch-target text-left">
                      Settings
                    </button>
                    <button className="w-full p-3 text-sm bg-muted hover:bg-accent hover:text-accent-foreground rounded-md transition-colors touch-target text-left">
                      Help & Support
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

const RightSidebarTrigger = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="size-7 p-2 rounded-md transition-colors hover:bg-muted"
      size="icon"
      onClick={toggleRightSidebar}
      aria-label={isRightSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    >
      <PanelRightIcon className="w-4 h-4  hover:text-foreground transition-colors" />
    </Button>
  );
};

export { RightSidebar, RightSidebarTrigger, RightSidebarProvider, useSidebar };