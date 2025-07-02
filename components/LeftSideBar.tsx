
"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // or from radix directly
import { Folder, FileText } from "lucide-react";

const dummyFolders = [
  {
    name: "Projects",
    children: [
      { name: "Kanji Combat", type: "file" },
      { name: "Algorithm Quest", type: "file" },
    ],
  },
  {
    name: "Blogs",
    children: [
      { name: "OOP in Python", type: "file" },
      { name: "Bio-Computer", type: "file" },
    ],
  },
];

const FolderView = ({ folders }: { folders: typeof dummyFolders }) => {
  return (
    <div className="mt-4 space-y-2">
      {folders.map((folder, idx) => (
        <div key={idx}>
          <div className="flex items-center gap-2 font-medium text-sm">
            <Folder className="w-4 h-4" />
            {folder.name}
          </div>
          <div className="ml-6 mt-1 space-y-1 text-sm text-muted-foreground">
            {folder.children.map((file, i) => (
              <div key={i} className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                <FileText className="w-4 h-4" />
                {file.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const LeftSideBar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: isCollapsed ? -200 : 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`hidden lg:flex flex-col p-4 border-r border-border/50 bg-background/95 backdrop-blur-sm relative overflow-hidden ${
        isCollapsed ? "w-24" : "w-64"
      }`}
    >
      <Tabs defaultValue="explorer" className="w-full">
        <TabsList className="grid grid-cols-2 bg-muted rounded-md mb-3">
          <TabsTrigger value="explorer">Explorer</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="explorer">
          <FolderView folders={dummyFolders} />
        </TabsContent>

        <TabsContent value="search">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 py-1 rounded-md border text-sm"
          />
        </TabsContent>
      </Tabs>
    </motion.aside>
  );
};

export default LeftSideBar;
