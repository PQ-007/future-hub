"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "./theme/ThemeToggleButton";
import { Globe, Palette, Brain, ChevronRight, PanelRightIcon } from "lucide-react";

const languages = [
  { code: "mn", name: "Монгол", flag: "🇲🇳", active: false },
  { code: "en", name: "English", flag: "🇺🇸", active: true },
  { code: "jp", name: "日本語", flag: "🇯🇵", active: false },
];

const RightSidebar = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <motion.aside
      className="bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col min-h-screen border-l"
      initial={{ width: isRightSidebarCollapsed ? 0 : 256 }}
      animate={{ width: isRightSidebarCollapsed ? 0 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={`flex items-center p-3 ${
          isRightSidebarCollapsed ? "justify-center" : "justify-between"
        } h-10 `}
      >
        {!isRightSidebarCollapsed && (
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Settings
          </h2>
        )}
      </div>


    </motion.aside>
  );
};



import  { createContext, useContext } from "react";
import { Button } from "./ui/button";

const RightSidebarContext = createContext({
  isRightSidebarCollapsed: false,
  toggleRightSidebar: () => {},
});
const RightSidebarProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);

  const toggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  return (
    <RightSidebarContext.Provider
      value={{ isRightSidebarCollapsed, toggleRightSidebar }}
    >
      {children}
    </RightSidebarContext.Provider>
  );
};
const useSidebar = () => useContext(RightSidebarContext);


const RightSidebarTrigger = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="size-7 p-2 rounded-ml transition-colors"
      size="icon"
      onClick={toggleRightSidebar}
      aria-label={isRightSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
    >
      <PanelRightIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
    </Button>
  );
};




export {RightSidebar, RightSidebarTrigger, RightSidebarProvider, useSidebar};