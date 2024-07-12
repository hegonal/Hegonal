import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/user-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/dashboard/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "@/components/dashboard/sidebar-toggle";
import { teamsResponseData } from "@/app/dashboard/[teamID]/layout";

interface SidebarProps {
  teamsData: teamsResponseData;
}

export function Sidebar({ teamsData }: SidebarProps) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <div className="flex items-center gap-2">
            <Link href="/" className="flexq items-center gap-2">
              <PanelsTopLeft className="w-6 h-6 mr-1" />
            </Link>
            <Link href="/" className="flexq items-center gap-2">
              <h1
                className={
                  "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300"
                }
              >
                Hegonal
              </h1>
            </Link>
          </div>
        </Button>
        <Menu isOpen={sidebar?.isOpen} teamsData={teamsData} />
      </div>
    </aside>
  );
}
