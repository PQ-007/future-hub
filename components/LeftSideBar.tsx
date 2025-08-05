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

    const handleNavigation = (href: string) => {
      if (isMobile) {
        setOpen(false);
      }
      router.push(href);
    };

    return (
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              tooltip={{
                children: item.title,
                hidden: false,
              }}
              isActive={activePath === item.href}
              className="px-2.5 md:px-2 w-full"
              asChild
            >
              <button
                onClick={() => handleNavigation(item.href)}
                className="flex w-full items-center gap-2 text-left"
                aria-label={`Navigate to ${item.title}`}
              >
                <item.icon className="size-4 shrink-0" />
                <span className="truncate">{item.title}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    );
  });

NavMenu.displayName = "NavMenu";

export function LeftSidebar({ ...props }: LeftSidebarProps) {
  const { setOpen, isMobile, open } = useSidebar();
  const pathname = usePathname();

  // Find active item based on current pathname
  const activeItem =
    data.navMain.find((item) => item.href === pathname) || data.navMain[0];

  return (
    <Sidebar
      collapsible={isMobile ? "offcanvas" : "icon"}
      className="overflow-hidden md:*:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* Primary Sidebar */}
      <Sidebar
        collapsible="none"
        className="w-full md:w-[calc(var(--sidebar-width-icon)+1px)] md:border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                asChild
                className="h-10 md:h-8 md:p-0 px-2"
                aria-label="Sugureta Engineer Dashboard"
              >
                <button
                  onClick={() => {
                    if (isMobile) setOpen(false);
                    // Navigate to home or handle logo click
                  }}
                  className="flex w-full items-center gap-2"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg shrink-0">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                    <span className="truncate font-medium">
                      Sugureta Engineer
                    </span>
                    <span className="truncate text-xs"></span>
                  </div>
                </button>
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

      {/* Secondary Sidebar - Only show on desktop when not mobile */}
      {!isMobile && (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="border-b h-12  p-3">
            <h1 className="text-sm md:text-base font-medium truncate">
              {activeItem.title}
            </h1>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="px-0">
              <SidebarGroupContent>
                <div className="p-4 text-sm text-muted-foreground">
                  Content for {activeItem.title} goes here. This could include
                  lists, details, or sub-navigation relevant to the selected
                  section.
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  );
}
