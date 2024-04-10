import React from "react";

import DashboardSkeleton from "@/components/skeletons/dashboard.skeleton";
import ListSkeleton from "@/components/skeletons/list.skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayoutSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-x-4 w-full divide-x">
      <div className="col-span-1 p-4">
        <div className="grid md:grid-cols-6 gap-x-4 border-b mb-2">
          <Skeleton className="h-8 mb-2" />
          <Skeleton className="h-8 mb-2 col-span-4" />
          <Skeleton className="h-8 mb-2" />
        </div>
        <ListSkeleton />
      </div>
      <DashboardSkeleton className="col-span-2 pl-4 p-4" />
    </div>
  );
}
