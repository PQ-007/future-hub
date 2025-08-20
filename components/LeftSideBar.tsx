"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import {
  Anvil,
  BirdIcon,
  ChevronRight,
  File,
  Folder,
  Home,
  Rocket,
  Store,
  SwatchBook,
  Swords,
  Telescope,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Type definitions for data
interface NavItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  subItems?: NavSubItem[];
}

interface NavSubItem {

  title: string;
  href: string;
  children?: NavSubItem[];
}

interface SidebarData {
  navMain: NavItem[];
}

// Sample data with nested sub-items
const data: SidebarData = {
  navMain: [
    {
      title: "Blog",
      icon: Telescope,
      href: "/blog",
      subItems: [
        {
          title: "Posts",
          href: "/blog/posts",
          children: [
            { title: "All Posts", href: "/blog/posts/all" },
            { title: "Drafts", href: "/blog/posts/drafts" },
          ],
        },
        { title: "Categories", href: "/blog/categories" },
        { title: "Tags", href: "/blog/tags" },
      ],
    },
    {
      title: "Project",
      icon: Anvil,
      href: "/project",
      subItems: [
        {
          title: "Active Projects",
          href: "/project/active",
          children: [
            { title: "In Progress", href: "/project/active/in-progress" },
            { title: "On Hold", href: "/project/active/on-hold" },
          ],
        },
        { title: "Archived", href: "/project/archived" },
      ],
    },
    {
      title: "Flashcard",
      icon: SwatchBook,
      href: "/flashcard",
      subItems: [
        { title: "My Decks", href: "/flashcard/decks" },
        { title: "Shared Decks", href: "/flashcard/shared" },
      ],
    },
    {
      title: "Competition",
      icon: Swords,
      href: "/competition",
      subItems: [
        { title: "Upcoming", href: "/competition/upcoming" },
        { title: "Past Events", href: "/competition/past" },
      ],
    },
    {
      title: "Showcase",
      icon: Rocket,
      href: "/showcase",
      subItems: [
        { title: "Featured", href: "/showcase/featured" },
        { title: "Community", href: "/showcase/community" },
      ],
    },
    {
      title: "Store",
      icon: Store,
      href: "/store",
      subItems: [
        { title: "Products", href: "/store/products" },
        { title: "Cart", href: "/store/cart" },
      ],
    },
  ],
};

// Memoized navigation menu for the first sidebar
const NavMenu: React.FC<{ navItems: NavItem[]; activePath: string }> = React.memo(
  ({ navItems, activePath }) => {
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
  }
);

NavMenu.displayName = "NavMenu";

// Tree component for rendering nested sub-items
function Tree({ item, activePath }: { item: NavSubItem; activePath: string }) {
  const { setOpen, isMobile } = useSidebar();
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (isMobile) {
      setOpen(false);
    }
    router.push(href);
  };

  if (!item.children || item.children.length === 0) {
    return (
      <SidebarMenuButton
        isActive={activePath === item.href}
        className="px-4 w-full data-[active=true]:bg-transparent"
        asChild
      >
        <button
          onClick={() => handleNavigation(item.href)}
          className="flex w-full items-center text-left text-sm"
          aria-label={`Navigate to ${item.title}`}
        >
          <File className="size-4 mr-2" />
          <span className="truncate">{item.title}</span>
        </button>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={item.children.some((child) => activePath.startsWith(child.href))}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="px-4 w-full">
            <ChevronRight className="transition-transform size-4 mr-2" />
            <Folder className="size-4 mr-2" />
            <span className="truncate">{item.title}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((subItem, index) => (
              <Tree key={index} item={subItem} activePath={activePath} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
}

// Memoized sub-menu for the second sidebar with tree view
const SubNavMenu: React.FC<{ subItems: NavSubItem[]; activePath: string }> = React.memo(
  ({ subItems, activePath }) => {
    return (
      <SidebarMenu>
        {subItems.map((subItem, index) => (
          <Tree key={index} item={subItem} activePath={activePath} />
        ))}
      </SidebarMenu>
    );
  }
);

SubNavMenu.displayName = "SubNavMenu";

export function LeftSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpen, isMobile, open } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  // Handle null pathname by providing a fallback
  const safePathname = pathname ?? "/";
  const activeItem = data.navMain.find((item) => safePathname.startsWith(item.href));

  const { user } = useAuth();

  const userData = {
    name: user?.user_metadata?.name || "No username",
    email: user?.email || "",
    avatar: user?.user_metadata?.avatar_url || "",
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* First Sidebar (Icon-based) */}
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
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
                    <span className="truncate font-medium">Sugureta Engineer</span>
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
              <NavMenu navItems={data.navMain} activePath={activeItem?.href || "/"} />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Second Sidebar (Tree view content) */}
      <Sidebar collapsible="none" className="text-sm text-white w-full md:w-[calc(var(--sidebar-width-content)+1px)]">
        <SidebarHeader className="w-[256px] h-12 border-b p-3">
          <div className="text-foreground text-base font-medium">
            {activeItem?.title || "Overview"}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {activeItem?.subItems && activeItem.subItems.length > 0 ? (
                <SubNavMenu subItems={activeItem.subItems} activePath={safePathname} />
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  No sub-items available for this section.
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}