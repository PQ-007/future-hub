"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { NavUser } from "./NavUser";
import { Input } from "./ui/input";

// Utility function to format breadcrumb segments
const formatSegment = (segment: string) =>
  segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { user } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const userData = {
    name: user?.user_metadata?.name || "Guest",
    email: user?.email || "",
    avatar: user?.user_metadata?.avatar_url || "",
  };

  // Generate breadcrumb items
  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      return { segment, path, isLast: index === array.length - 1 };
    });

  return (
    <header className="sticky top-0 z-50 flex h-12 shrink-0 items-center gap-4 border-b bg-background/95 px-4 transition-all ease-linear supports-[backdrop-filter]:backdrop-blur-sm">
      <div className="flex w-full items-center justify-between gap-4">
       <SidebarTrigger/>

       

        {/* Breadcrumb Navigation */}
        <Breadcrumb className="flex-1 truncate">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathname !== "/" &&
              pathname !== "/signin" &&
              pathname !== "/signup" &&
              breadcrumbItems.map(({ segment, path, isLast }, index) => (
                <Fragment key={index}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage >
                        {formatSegment(segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={path}
                        className=" hover:text-primary transition-colors"
                      >
                        {formatSegment(segment)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
          </BreadcrumbList>
        </Breadcrumb>

        {/* Search Bar */}
        <div className="flex  items-center gap-2">
          <div
            className={`relative w-full max-w-xs transition-all  duration-300 ${
              isSearchOpen ? "block" : "hidden md:block"
            }`}
          >
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-8 w-full text-sm focus:ring-2 focus:ring-primary rounded-md h-8"
              aria-label="Search site content"
            />
            {isSearchOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-1"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label={isSearchOpen ? "Close search" : "Open search"}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <Separator
            orientation="vertical"
            className="hidden md:block h-6"
            aria-hidden="true"
          />
          {user ? (
            <NavUser user={userData} />
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/signin")}
            >
              <span className="text-sm ">Sign in</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}