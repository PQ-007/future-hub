"use client";

import * as React from "react";
import {
  Anvil,
  Command,
  LineChart,
  Origami,
  Route,
  Swords,
  Telescope,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";

// Type definitions for data
interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarData {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavItem[];
}

// Sample data
const data: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Blogs", icon: Telescope, href: "/blog" },
    { title: "Projects", icon: Anvil, href: "/project" },
    { title: "Stats", icon: LineChart, href: "/statistic" },
    { title: "Flashcard", icon: Swords, href: "/flashcard" },
    { title: "Roadmap", icon: Route, href: "/roadmap" },
    { title: "Showcase", icon: Origami, href: "/showcase" },
  ],
};

interface LeftSidebarProps extends React.ComponentProps<typeof Sidebar> {}

// Memoized navigation menu to prevent unnecessary re-renders
const NavMenu: React.FC<{ navItems: NavItem[]; activePath: string }> =
  React.memo(({ navItems, activePath }) => {
    const { setOpen, isMobile } = useSidebar();
    const router = useRouter();

    return (
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={activePath === item.href}
              className="px-2.5 md:px-2"
              asChild
            >
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  // Only close sidebar on mobile after navigation
                  if (isMobile) {
                    setOpen(false);
                  }
                  router.push(item.href); // Use client-side navigation
                }}
                aria-label={`Navigate to ${item.title}`}
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  });

export function LeftSidebar({ ...props }: LeftSidebarProps) {
  const { setOpen, isMobile } = useSidebar();
  const pathname = usePathname();

  // Find active item based on current pathname
  const activeItem =
    data.navMain.find((item) => item.href === pathname) || data.navMain[0];

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Primary Sidebar */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="md:h-8 md:p-0"
                aria-label="Acme Inc Dashboard"
              >
                <a href="/">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <NavMenu navItems={data.navMain} activePath={pathname} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Secondary Sidebar */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5  p-2">
          <div className="flex w-full items-center justify-between">
            <div className="text-foreground text-base font-medium">
              {activeItem.title}
            </div>
          </div>

        </SidebarHeader>
        <SidebarContent className="border-t">
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <div className="p-4 text-sm text-foreground">
                Content for {activeItem.title} goes here. This could include
                lists, details, or sub-navigation relevant to the selected
                section.
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
