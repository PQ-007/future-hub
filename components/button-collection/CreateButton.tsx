"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  FileText,
  Image,
  Video,
  Folder,
  Users,
  Calendar,
  Code,
  MessageSquare,
  Presentation,
  Database,
  Layout,
  ChevronDown,
  Zap,
  SwatchBook,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CreateButton = () => {
  const router = useRouter();

  const createOptions = [
    {
      category: "Content",
      items: [
        {
          icon: FileText,
          label: "Blog",
          description: "Write a new blog post",
          action: () => console.log("Create document"),
        },
        {
          icon: SwatchBook,
          label: "Flashcard Deck",
          description: "Make a new flashcard deck",
          action: () => console.log("Create image post"),
        },
      ],
    },
    {
      category: "Collaboration",
      items: [
        {
          icon: Trophy,
          label: "Competition",
          description: "Organize a new competition",
          action: () => console.log("Create team"),
        },
        {
          icon: MessageSquare,
          label: "Discussion",
          description: "Start a discussion thread",
          action: () => console.log("Create discussion"),
        },
      ],
    },
    {
      category: "Development",
      items: [
        {
          icon: Code,
          label: "Project",
          description: "Create new coding project",
          action: () => console.log("Create project"),
        },
      ],
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90",
            "transition-all duration-200 hover:shadow-md"
          )}
        >
          <Plus className="h-4 w-4" />
          Create
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        {/* Categorized Options */}
        {createOptions.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground px-3 py-1">
                {category.category}
              </DropdownMenuLabel>
              {category.items.map((item, itemIndex) => (
                <DropdownMenuItem
                  key={itemIndex}
                  onClick={item.action}
                  className="cursor-pointer px-3 py-2 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-accent/50 flex items-center justify-center group-hover:bg-accent transition-colors">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {categoryIndex < createOptions.length - 1 && (
              <DropdownMenuSeparator />
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateButton;
