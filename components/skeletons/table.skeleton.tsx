import React from "react";
import { Loader } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  length?: number;
  className?: string;
  gridTemplateColumns?: number;
  itemProps?: {
    className?: string;
  };
};

export default function TableSkeleton({
  length = 21,
  className,
  itemProps,
  gridTemplateColumns = 5,
}: Props) {
  return (
    <>
      <div className="absolute inset-0 z-50 flex gap-y-12 flex-col items-center justify-center">
        <Loader
          aria-label="Loading..."
          className="animate-spin transition-opacity ease-in-out"
          size={36}
          style={{ animationDuration: "2s" }}
        />
      </div>
      <div className={cn("grid mt-2 p-2", className)} role="list">
        <div
          className="grid w-full py-2 gap-x-2"
          style={{ gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)` }}
        >
          {Array.from({ length: gridTemplateColumns }).map((index) => (
            <Skeleton
              className={cn("h-8 mt-2", itemProps?.className)}
              key={Number(index)}
            />
          ))}
        </div>
        <div
          className="grid w-full px-2 py-4 gap-x-2 bg-white border rounded-lg"
          style={{ gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)` }}
        >
          {Array.from({ length: gridTemplateColumns }).map((index) => (
            <Skeleton
              className={cn("h-8 mt-2", itemProps?.className)}
              key={Number(index)}
            />
          ))}
          {Array.from({ length }).map((index) => (
            <Skeleton
              className={cn("h-4 mt-2", itemProps?.className)}
              key={Number(index)}
            />
          ))}
        </div>
        <footer className="grid w-full py-2 gap-x-2 grid-cols-4">
          {Array.from({ length: 4 }).map((index) => (
            <Skeleton
              className={cn("h-8 mt-2", itemProps?.className)}
              key={Number(index)}
            />
          ))}
        </footer>
      </div>
    </>
  );
}
