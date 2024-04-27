import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

import { Logo } from "@/assets/Icons";
import DashboardNavigation from "@/components/dashboard-navigation";
import { EnvironmentSwitcher } from "@/components/environment-switcher";
import { Label } from "@/components/ui/label";
import { UserNav } from "@/components/user-nav";
import { paths } from "@/constants/paths";
import { getUser } from "@/services/auth";
import { getEnvironments } from "@/services/environments/actions";

export const metadata: Metadata = {
  title: "Requester - Dashboard",
  description: "Manage your requests with ease.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  const { data: environments = [] } = await getEnvironments();

  if (!user) {
    return redirect(paths.login, RedirectType.replace);
  }

  return (
    <main className="p-2 h-screen">
      <section className="flex border rounded-lg h-full">
        <aside className="w-32 flex flex-col gap-y-2 border-r p-2 h-full">
          <div className="flex justify-center flex-col gap-y-1 items-center h-20 w-full border-b pb-2">
            <Link href={paths.home}>
              <Logo className="h-12 w-12 text-primary border p-1 rounded-full" />
            </Link>
            <Label className="ml-2">Requester</Label>
          </div>
          <DashboardNavigation />
        </aside>
        <section className="w-full h-full">
          <div className="h-14 p-2 border-b w-full flex flex-row gap-x-4 items-center justify-between">
            <EnvironmentSwitcher environments={environments} />
            <UserNav />
          </div>
          <div className="w-full h-[calc(100%-56px)] overflow-y-auto">
            {children}
          </div>
        </section>
      </section>
    </main>
  );
}
