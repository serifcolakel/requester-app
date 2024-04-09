import React from "react";
import { Archive, GalleryThumbnails, LayoutDashboard } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

import { EnvironmentSwitcher } from "@/components/environment-switcher";
import { Label } from "@/components/ui/label";
import { UserNav } from "@/components/user-nav";
import { paths } from "@/constants/paths";
import { getUser } from "@/services/auth";

export const metadata: Metadata = {
  title: "Requester Application Dashboard",
  description: "Manage your requests with ease.",
};

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

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    return redirect(paths.login, RedirectType.replace);
  }

  return (
    <main className="p-2  h-screen">
      <section className="flex border rounded-lg h-full">
        <aside className="w-32 flex flex-col gap-y-2 border-r p-2 h-full">
          <div className="flex justify-center items-center h-16 w-full">
            <Image
              priority
              alt="User avatar"
              className="h-10 w-10 rounded-full"
              height={40}
              resource="image"
              src="/favicon.ico"
              width={40}
            />
          </div>
          {links.map(({ href, text, icon: Icon }) => (
            <Link
              className="px-4 bg-gray-50 py-4 gap-y-2 flex flex-col items-center justify-center rounded-lg hover:bg-gray-100"
              href={href}
              key={href}
              locale={false}
            >
              <Icon className="h-5 w-5" />
              <Label variant="label-sm">{text}</Label>
            </Link>
          ))}
        </aside>
        <section className="w-full">
          <div className="p-2 border-b w-full flex flex-row gap-x-4">
            <EnvironmentSwitcher />
            <EnvironmentSwitcher />
            <UserNav />
          </div>
          {children}
        </section>
      </section>
    </main>
  );
}
