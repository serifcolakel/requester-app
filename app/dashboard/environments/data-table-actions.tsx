"use client";

import { EllipsisIcon, TrashIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteVariable } from "@/services/variables/actions";
import { Variable } from "@prisma/client";

interface DataTableRowActionsProps {
  row: Row<Variable>;
}

export function DataTableActions({ row }: DataTableRowActionsProps) {
  const variable = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <EllipsisIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={deleteVariable}>
            <input defaultValue={variable.id} name="id" type="hidden" />
            <Button
              className="w-full p-0 h-4 gap-x-2 justify-start"
              type="submit"
              variant="none"
            >
              <TrashIcon className="h-4 w-4" />
              Delete
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
