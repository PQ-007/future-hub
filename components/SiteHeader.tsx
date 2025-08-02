import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { RightSidebarTrigger} from "./RightSidebar"
import { Menu } from "lucide-react"

export function SiteHeader() {
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
          Documents
        </h1>
        
        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* GitHub link - Hidden on small screens */}
          <Button 
            variant="ghost" 
            asChild 
            size="sm" 
            className="hidden sm:flex text-xs md:text-sm px-2 md:px-3"
          >
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
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
  )
}