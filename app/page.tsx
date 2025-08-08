import { ChartRadarGridFill } from "@/components/chart/test";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <div className="pb-5">{/* Breadcrumb content */}</div>
      <div className="flex-1 min-h-0">
        <ChartRadarGridFill />
      </div>
    </div>
  );
}
