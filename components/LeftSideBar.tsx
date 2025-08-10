"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  Anvil,
  BirdIcon,
  Rocket,
  Route,
  SwatchBook,
  Swords,
  Telescope
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

// Type definitions for data
interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface SidebarData {
  navMain: NavItem[];
}

// Sample data
const data: SidebarData = {
  navMain: [
    { title: "Blog", icon: Telescope, href: "/blog" },
    { title: "Project", icon: Anvil, href: "/project" },
    { title: "Flashcard", icon: SwatchBook, href: "/flashcard" },
    { title: "Competition", icon: Swords, href: "/competition" },
    { title: "Showcase", icon: Rocket, href: "/showcase" },
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
              className="px-3 md:px-2 w-full"
              asChild
            >
              <button
                onClick={() => handleNavigation(item.href)}
                className="flex w-full items-center text-left"
                aria-label={`Navigate to ${item.title}`}
              >
                <item.icon className="size-4" />
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
  const router = useRouter();
  // Find active item based on current pathname
  const activeItem =
    data.navMain.find((item) => item.href === pathname) || data.navMain[0];

  const { user } = useAuth();

  const userData = {
    name: user?.user_metadata?.name || "No username",
    email: user?.email || "",
    avatar: user?.user_metadata?.avatar_url || "",
  };

  return (

      <Sidebar
        collapsible="icon"
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
                    router.push("/");
                  }}
                  className="flex w-full items-center gap-2"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full shrink-0">
                    <BirdIcon className="size-5 hover:size-6 hover:rotate-15" />
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
      
      

   
   
  );
}
