import React from "react";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type TableEmptyStateProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  src?: string;
};

export default function TableEmptyState({
  className,
  children,
  src = "/illustration-no-data.svg",
  title = "You don't have any table items yet.",
  description = "Start by adding a new item to your table. Data from your collections will appear here.",
}: TableEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col flex-1 bg-gray-100/60 space-y-4 items-center rounded-lg p-4",
        className
      )}
    >
      <Image alt="No items found" height={120} src={src} width={120} />
      <div className="text-center">
        <Label variant="h6">{title}</Label>
      </div>
      <div className="text-center">
        <Label variant="label-xs">{description}</Label>
      </div>
      {children}
    </div>
  );
}
