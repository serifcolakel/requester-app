import React from "react";

import EmptyState from "@/components/empty-states/empty.state";
import { Label } from "@/components/ui/label";

export default async function Page() {
  return (
    <section className="flex h-full p-4 flex-col">
      <EmptyState
        className="flex items-center justify-center h-full w-full"
        description="You can manage your collections. Pick a collection from the left to get started."
        imageProps={{
          className: "md:mt-0",
          height: 200,
          width: 200,
        }}
        src="/illustration-search.svg"
        title="No Collection Selected."
      >
        <div className="flex gap-x-2">
          <Label variant="h3">Select a Collection from the left.</Label>
        </div>
      </EmptyState>
    </section>
  );
}
