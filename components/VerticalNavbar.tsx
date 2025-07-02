"use client";
import {
  Telescope,
  Anvil,
  LineChart,
  Origami,
  Swords,
  Bird,
  GitFork,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Graph view", icon: GitFork, href: "/graph-view" },
  { name: "Blogs", icon: Telescope, href: "/blog" },
  { name: "Projects", icon: Anvil, href: "/project" },
  { name: "Stats", icon: LineChart, href: "/statistic" },
  { name: "Flashcard", icon: Swords, href: "/flashcard" },
  { name: "Showcase", icon: Origami, href: "/showcase" },
];

const VerticalNavbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>();

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden lg:flex flex-col h-min-full border-r border-border/50 bg-sidebar/50 backdrop-blur-xl relative overflow-hidden"
    >
      <aside className=" inset-y-0 left-0 hidden h-full w-12 rounded-r-lg flex-col justify-between bg-background sm:flex">
        <nav className="flex flex-col items-center h-full gap-5 px-2 py-5 ">
          <Link
            href="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground transition-all hover:scale-105 "
          >
            <Bird className="h-5 w-5 transition-all hover:scale-110"/>
          </Link>
          <div className="flex flex-col h-full items-center gap-2">
            {navItems.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.href)}
                    className={`flex h-10 w-10 items-center justify-center rounded-md transition-all duration-200 ${
                      activeItem === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-white "
                    } focus:outline-none focus:ring-primary focus:ring-offset-2`}
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  className="bg-background shadow-sm text-light-black"
                >
                  {item.name}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </nav>
      </aside>
    </motion.aside>
  );
};

export default VerticalNavbar;
