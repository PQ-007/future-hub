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
export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3 transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-2">
        {/* Mobile and Desktop Sidebar Trigger */}
        <SidebarTrigger className="flex md:flex -ml-1 p-1" />

        <Separator
          orientation="vertical"
          className="hidden md:block data-[orientation=vertical]:h-4"
        />

        {/* Title - Responsive sizing */}
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-2">
          <Button
            variant={"ghost"}
            className="m-1 rounded-4xl "
            size={"sm"}
            onClick={() => {
              router.push("/about-me");
            }}
          >
            About me
          </Button>

          <Separator
            orientation="vertical"
            className="hidden md:block data-[orientation=vertical]:h-4"
          />

          {/* Right Sidebar Trigger - Show on all screen sizes */}
          <RightSidebarTrigger />
        </div>
      </div>
    </header>
  );
}
