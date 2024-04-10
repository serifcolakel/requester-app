import React from "react";

import ListEmptyState from "@/components/empty-states/list.empty.state";
import ListSkeleton from "@/components/skeletons/list.skeleton";
import { cn } from "@/lib/utils";

export type ListProps<T extends object> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  loading?: boolean;
  emptyStateProps?: React.ComponentProps<typeof ListEmptyState>;
  listSkeletonProps?: React.ComponentProps<typeof ListSkeleton>;
};

export default function List<T extends object>({
  items,
  renderItem,
  className,
  loading,
  emptyStateProps,
  listSkeletonProps,
}: ListProps<T>) {
  if (loading) {
    return <ListSkeleton {...listSkeletonProps} />;
  }

  if (items.length === 0) {
    return <ListEmptyState {...emptyStateProps} />;
  }

  return (
    <div className={cn("w-full", className)} role="list">
      {items.map(renderItem)}
    </div>
  );
}
