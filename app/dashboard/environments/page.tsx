import EmptyState from "@/components/empty-states/empty.state";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <section className="flex h-full p-4 flex-col">
      <EmptyState
        className="flex items-center justify-center h-full w-full"
        description="You can manage your environments. Pick an environment from the left to get started."
        imageProps={{
          className: "md:mt-0",
          height: 200,
          width: 200,
        }}
        src="/illustration-search.svg"
        title="No Environment Selected."
      >
        <div className="flex gap-x-2">
          <Label variant="h3">Select a Environment from the left.</Label>
        </div>
      </EmptyState>
    </section>
  );
}
