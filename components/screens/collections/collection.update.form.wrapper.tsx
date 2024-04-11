import React from "react";
import { Edit } from "lucide-react";

import UpdateCollectionForm from "@/components/screens/collections/collection.update.form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Collection } from "@prisma/client";

export default function UpdateCollectionFormWrapper({
  collection,
  formAction,
}: {
  collection: Collection;
  formAction: (payload: FormData) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-8 p-0 hover:text-primary"
          tooltip="Edit Collection"
          variant="icon"
        >
          <span className="sr-only">Edit collection</span>
          <Edit className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2 flex flex-col">
            <Label variant="label-md" weight="bold">
              Update Collection
            </Label>
            <Label variant="paragraph-xs">
              Set the name of the collection.
            </Label>
          </div>
          <form action={formAction} className="grid gap-2">
            <UpdateCollectionForm collection={collection} />
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
