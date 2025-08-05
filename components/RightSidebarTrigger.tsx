import { PanelRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState, createContext, useContext, useCallback } from "react";

const RightSidebarContext = createContext({
  isRightSidebarCollapsed: false,
  toggleRightSidebar: () => {},
});

export const RightSidebarProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
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

export const useSidebar = () => useContext(RightSidebarContext);
export const RightSidebarTrigger = () => {
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