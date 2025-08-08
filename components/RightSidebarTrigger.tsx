import { PanelRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import React, { useState, createContext, useContext, useCallback } from "react";
import { RightSidebarContext } from "@/contexts/RightSidebarContext";

export const useSidebar = () => useContext(RightSidebarContext);
export const RightSidebarTrigger = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      className="size-7 p-2 rounded-md transition-colors "
      size="icon"
      onClick={toggleRightSidebar}
      aria-label={
        isRightSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"
      }
    >
      <PanelRightIcon className="w-4 h-4  hover:text-foreground transition-colors" />
    </Button>
  );
};
