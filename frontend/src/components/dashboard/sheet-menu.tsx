"use client";

import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/dashboard/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { teamsResponseData } from "@/app/dashboard/[teamID]/layout";

interface SheetMenuProps {
  teamsData: teamsResponseData;
}

export function SheetMenu({ teamsData }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-center items-center pb-2 pt-1"
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
        </SheetHeader>
        <Menu isOpen teamsData={teamsData} />
      </SheetContent>
    </Sheet>
  );
}
