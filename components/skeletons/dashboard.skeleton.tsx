import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  limits?: {
    header: number;
    section: number;
    list: number;
    footer: number;
  };
};

export default function DashboardSkeleton({
  className,
  limits = {
    header: 8,
    section: 3,
    list: 100,
    footer: 1,
  },
}: Props) {
  return (
    <div className={cn("w-full p-4", className)}>
      <header className="grid md:grid-cols-8 gap-x-4 w-full border-b mb-2">
        {Array.from({ length: limits.header }).map((index) => (
          <Skeleton className="h-8 mb-2" key={Number(index)} />
        ))}
      </header>
      <section className="grid md:grid-cols-3 gap-x-4 w-full border-b mb-2">
        {Array.from({ length: limits.section }).map((index) => (
          <Skeleton className="h-40 mb-2" key={Number(index)} />
        ))}
      </section>
      <div className="grid md:grid-cols-4 gap-x-4 w-full border-b mb-2">
        {Array.from({ length: limits.list }).map((index) => (
          <Skeleton className="h-12 mb-2" key={Number(index)} />
        ))}
      </div>
      <footer>
        {Array.from({ length: limits.footer }).map((index) => (
          <Skeleton className="h-32 mb-2" key={Number(index)} />
        ))}
      </footer>
    </div>
  );
}
