"use client";

import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PopoverClose } from "@/components/ui/popover";
import { Collection } from "@prisma/client";

export default function UpdateCollectionForm({
  collection,
}: {
  collection: Collection;
}) {
  const { pending } = useFormStatus();

  return (
    <>
      <div className="grid grid-cols-6 items-center gap-4">
        <Label htmlFor="name">Name</Label>
        <Input
          className="col-span-5 h-8"
          defaultValue={collection.name}
          disabled={pending}
          id="name"
          name="name"
        />
        <Input
          className="col-span-2 h-8"
          defaultValue={collection.id}
          id="id"
          name="id"
          type="hidden"
        />
      </div>
      <PopoverClose asChild>
        <Button
          className="w-full mt-2"
          disabled={pending}
          size="xs"
          type="submit"
        >
          Save
        </Button>
      </PopoverClose>
    </>
  );
}
