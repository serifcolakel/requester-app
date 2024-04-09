import React from "react";

import DashboardSkeleton from "@/components/skeletons/dashboard.skeleton";
import ListSkeleton from "@/components/skeletons/list.skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="border flex flex-row divide-x rounded-lg m-4 h-[calc(100vh-36px)]">
      <div className="flex-1 p-4 overflow-y-auto">
        {Array.from({ length: Math.random() * 10 }).map((index) => (
          <Skeleton className="h-20 mb-2 pt-3" key={Number(index)}>
            <Skeleton className="h-10 mb-2 col-span-4 bg-gray-300 mx-2" />
            <Skeleton className="h-3 mb-2 col-span-4 bg-gray-300 mx-2" />
          </Skeleton>
        ))}
      </div>
      <div className="flex-[6] p-4 overflow-y-auto">
        <div className="col-span-1 p-4">
          <div className="grid md:grid-cols-6 gap-x-4 border-b mb-2">
            <Skeleton className="h-8 mb-2" />
            <Skeleton className="h-8 mb-2 col-span-4" />
            <Skeleton className="h-8 mb-2" />
          </div>
          <ListSkeleton />
        </div>
      </div>
      <div className="flex-[16] p-4 overflow-y-auto">
        <DashboardSkeleton />
      </div>
    </div>
  );
}
