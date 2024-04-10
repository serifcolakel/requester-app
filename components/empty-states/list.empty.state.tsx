import React from "react";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type ListEmptyStateProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  src?: string;
};

export default function ListEmptyState({
  className,
  children,
  src = "/illustration-no-data.svg",
  title = "You don't have any items yet.",
  description = "Don't worry, when you do they will show up here. Data from your collections will appear here.",
}: ListEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col flex-1 bg-gray-100/60 space-y-4 items-center rounded-lg p-4",
        className
      )}
    >
      <Image
        alt="No items found"
        className="md:mt-20"
        height={200}
        src={src}
        width={200}
      />
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
