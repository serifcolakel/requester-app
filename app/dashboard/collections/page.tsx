import React from "react";
import { DotSquare, Folder, MoreHorizontal, Plus, Trash } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { paths } from "@/constants/paths";
import {
  createNewCollection,
  deleteCollectionAction,
  getCollections,
} from "@/services/collections/actions";

export default async function Page() {
  const { data: collections = [] } = await getCollections();

  return (
    <ResizablePanelGroup className="items-stretch" direction="horizontal">
      <ResizablePanel collapsible className="" minSize={15}>
        <div className="flex flex-row items-center justify-between px-2 py-4 gap-x-2">
          <TooltipProvider key="new collection">
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={createNewCollection}>
                  <Input name="name" type="hidden" value="New Collection" />

                  <Button
                    className="mt-1"
                    size="xs"
                    type="submit"
                    variant="icon"
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </form>
              </TooltipTrigger>
              <TooltipContent>Add new collection</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Input
            className="h-8"
            // onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            // value={search}
          />

          <form action={createNewCollection}>
            <Input name="name" type="hidden" value="New Collection" />
            <Button className="mt-1" size="xs" type="submit" variant="icon">
              <DotSquare className="w-6 h-6" />
            </Button>
          </form>
        </div>
        <section className="px-4">
          {collections?.map((collection) => (
            <div
              className="flex flex-row gap-x-4 items-center justify-between px-2 rounded-lg hover:bg-gray-100"
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-8 w-8 p-0  z-50" variant="icon">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <form action={deleteCollectionAction} className="w-full">
                      <Input name="id" type="hidden" value={collection.id} />
                      <Button
                        className="flex items-center justify-between w-full hover:text-red-500"
                        size="xs"
                        type="submit"
                        variant="icon"
                      >
                        <Trash className="w-4 h-4" />
                        <span>Delete</span>
                      </Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </section>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="p-4" minSize={70}>
        <div>content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
