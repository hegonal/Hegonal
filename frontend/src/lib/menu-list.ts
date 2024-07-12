import {
  Users,
  LayoutGrid,
  LucideIcon,
  Activity,
  ShieldAlert,
  BellRing,
  Wrench,
  PanelTop,
  Bolt,
  Receipt,
} from "lucide-react";
import { GanttChart } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "overview",
          label: "Overview",
          active: pathname.includes("/overview"),
          icon: GanttChart,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Content",
      menus: [
        {
          href: "monitors",
          label: "Monitors",
          active: pathname.includes("/monitors"),
          icon: Activity,
          submenus: [],
        },
        {
          href: "incidents",
          label: "Incidents",
          active: pathname.includes("/Incidents"),
          icon: ShieldAlert,
          submenus: [],
        },
        {
          href: "notification",
          label: "Notification",
          active: pathname.includes("/notification"),
          icon: BellRing,
          submenus: [],
        },
        {
          href: "maintenance",
          label: "Maintenance",
          active: pathname.includes("/maintenance"),
          icon: Wrench,
          submenus: [],
        },
        {
          href: "status",
          label: "Status page",
          active: pathname.includes("/status"),
          icon: PanelTop,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Team",
      menus: [
        {
          href: "members",
          label: "Members",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "team-setting",
          label: "Team setting",
          active: pathname.includes("/team-setting"),
          icon: Bolt,
          submenus: [],
        },
        {
          href: "team-plan",
          label: "Team plan",
          active: pathname.includes("/team plan"),
          icon: Receipt,
          submenus: [],
        },
      ],
    },
  ];
}
