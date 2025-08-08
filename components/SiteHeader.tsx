"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { RightSidebarTrigger } from "./RightSidebarTrigger";
import { useRouter, usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { NavUser } from "./NavUser";
import { useAuth } from "@/contexts/AuthContext";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();

  const userData = {
    name: user?.user_metadata?.name || "No username",
    email: user?.email || "",
    avatar: user?.user_metadata?.avatar_url || "",
  };

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3 transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-around gap-2">
        <SidebarTrigger className="flex md:flex -ml-1 p-1" />

        <Separator
          orientation="vertical"
          className="hidden md:block data-[orientation=vertical]:h-4"
        />

        <h1 className="text-sm md:text-base font-medium truncate">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              {pathname !== "/" &&
              
                pathname
                  .split("/")
                  .filter(Boolean)
                  .map((segment, index, array) => (
                    <Fragment key={index}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {index === array.length - 1 ? (
                          <BreadcrumbPage>
                            {segment
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={`/${array.slice(0, index + 1).join("/")}`}
                          >
                            {segment
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  ))}
            </BreadcrumbList>
          </Breadcrumb>
        </h1>

        <div className="flex-1" />
        <div className="hidden md:flex items-center relative w-full max-w-sm">
          <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 w-max" />
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <RightSidebarTrigger />

          <Separator
            orientation="vertical"
            className="hidden md:block data-[orientation=vertical]:h-4"
          />

          {user ? (
            <NavUser user={userData} />
          ) : (
            <Button
              className="rounded-full w-auto h-6"
              size="sm"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
