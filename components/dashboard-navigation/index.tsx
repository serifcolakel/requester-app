"use client";

import React from "react";
import { Archive, GalleryThumbnails, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Label } from "@/components/ui/label";
import { paths } from "@/constants/paths";
import { cn } from "@/lib/utils";

const links = [
  {
    href: paths.dashboard.index,
    text: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: paths.dashboard.collections,
    text: "Collections",
    icon: Archive,
  },
  {
    href: paths.dashboard.environments,
    text: "Environments",
    icon: GalleryThumbnails,
  },
];

export default function DashboardNavigation() {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-y-2">
      {links.map(({ href, text, icon: Icon }) => (
        <Link
          className={cn(
            "px-4 bg-gray-50 py-4 gap-y-2 flex flex-col items-center justify-center rounded-lg hover:bg-gray-100",
            pathName === href ? "bg-gray-100" : ""
          )}
          href={href}
          key={href}
          locale={false}
        >
          <Icon className="h-5 w-5" />
          <Label variant="label-sm">{text}</Label>
        </Link>
      ))}
    </div>
  );
}
