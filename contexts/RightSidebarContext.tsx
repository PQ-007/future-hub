import { createContext, useCallback, useState } from "react";



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

export const RightSidebarContext = createContext({
  isRightSidebarCollapsed: false,
  toggleRightSidebar: () => {},
});