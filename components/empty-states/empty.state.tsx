import React from "react";
import Image from "next/image";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  src?: string;
  imageProps?: {
    height: number;
    width: number;
    className: string;
  };
};

export default function EmptyState({
  className,
  children,
  src = "/illustration-hit-send.svg",
  title = "You don't have any items yet.",
  description = "You can create new items by clicking the button below.",
  imageProps = {
    height: 200,
    width: 200,
    className: "md:mt-20",
  },
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col flex-1 bg-gray-100/60 space-y-4 items-center rounded-lg p-4",
        className
      )}
    >
      <Image {...imageProps} alt="Empty State" src={src} />
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
