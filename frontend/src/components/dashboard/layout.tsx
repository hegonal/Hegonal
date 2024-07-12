"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/user-store";
import { Footer } from "@/components/dashboard/footer";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { useRouter } from "next/navigation";
import { teamsResponseData } from "@/app/dashboard/[teamID]/layout";

type AdminPanelLayoutProps = {
  children: React.ReactNode;
  teamsData: teamsResponseData;
};

export default function AdminPanelLayout({
  children,
  teamsData,
}: AdminPanelLayoutProps) {

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar teamsData={teamsData}/>
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <Footer />
      </footer>
    </>
  );
}
