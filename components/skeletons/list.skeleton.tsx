import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  length?: number;
  className?: string;
  itemProps?: {
    className?: string;
  };
};

export default function ListSkeleton({
  length = 50,
  className,
  itemProps,
}: Props) {
  return (
    <div className={cn("space-y-2", className)} role="list">
      {Array.from({ length }).map((index) => (
        <Skeleton
          className={cn("h-8 mb-2", itemProps?.className)}
          key={Number(index)}
        />
      ))}
    </div>
  );
}
