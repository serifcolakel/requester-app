import React from "react";
import { Edit, Folder, Trash } from "lucide-react";
import Link from "next/link";

import List from "@/components/list";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { paths } from "@/constants/paths";
import {
  deleteCollectionAction,
  updateCollection,
} from "@/services/collections/actions";
import { Collection } from "@prisma/client";

export default async function CollectionList({
  collections,
  listProps,
}: {
  collections: Collection[];
  listProps?: Omit<React.ComponentProps<typeof List>, "items" | "renderItem">;
}) {
  return (
    <List
      {...listProps}
      items={collections || []}
      renderItem={(collection) => (
        <div
          className="flex group flex-row gap-x-4 items-center justify-between px-2 rounded-lg hover:bg-gray-100"
          key={collection.id}
        >
          <Link
            className="flex flex-row items-center gap-x-2"
            href={paths.dashboard.collection.replace(":id", collection.id)}
            key={collection.id}
          >
            <div className="flex flex-row items-center gap-x-2">
              <Folder className="w-6 h-6" />
              <Label variant="label-sm">{collection.name}</Label>
            </div>
          </Link>
          <div className="flex flex-row gap-x-1 items-center justify-center">
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 w-8 text-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="h-8 w-8 p-0 hover:text-primary"
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
                    <form action={updateCollection} className="grid gap-2">
                      <div className="grid grid-cols-6 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          className="col-span-5 h-8"
                          defaultValue={collection.name}
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
                        <Button className="w-full mt-2" size="xs" type="submit">
                          Save
                        </Button>
                      </PopoverClose>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="group-hover:opacity-100 opacity-0 transition-opacity duration-300 w-8 text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="h-8 w-8 p-0 hover:text-red-500"
                    variant="icon"
                  >
                    <span className="sr-only">Delete collection</span>
                    <Trash className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your{" "}
                      <Label className="text-primary" variant="paragraph-sm">
                        Collection
                      </Label>{" "}
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="w-full flex justify-end">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogCancel asChild>
                      <form action={deleteCollectionAction}>
                        <Input name="id" type="hidden" value={collection.id} />
                        <Button type="submit" variant="destructive">
                          Apply
                        </Button>
                      </form>
                    </AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}
    />
  );
}
