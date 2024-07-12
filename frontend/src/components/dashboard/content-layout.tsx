"use client"
import { teamsResponseData } from "@/app/dashboard/[teamID]/layout";
import { Navbar } from "@/components/dashboard/navbar";
import { useRouter } from "next/navigation";

interface ContentLayoutProps {
  children: React.ReactNode;
  teamsData: teamsResponseData
}

export function ContentLayout({ children, teamsData }: ContentLayoutProps) {
  
  return (
    <div>
      <Navbar teamsData={teamsData}/>
      <div className="container pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
