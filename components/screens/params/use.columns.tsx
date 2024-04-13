"use client";

import { useMemo } from "react";
import { TrashIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import EditRow from "@/app/dashboard/environments/edit-row";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Params } from "@prisma/client";

type Props = {
  onDelete: (data: FormData) => void;
  onEdit: (data: FormData) => void;
};

export default function useColumns({ onDelete, onEdit }: Props) {
  const columns: ColumnDef<Params>[] = useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
        header: ({ table }) => {
          return (
            <Checkbox
              aria-label="Select all"
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              className="translate-y-[2px]"
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
            />
          );
        },
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            className="translate-y-[2px]"
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
        enableSorting: false,
      },
      {
        id: "key",
        accessorKey: "key",
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title="Name" />;
        },
        cell: ({ row }) => {
          return <EditRow action={onEdit} name="key" row={row.original} />;
        },
      },
      {
        accessorKey: "value",
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title="Value" />;
        },
        cell: ({ row }) => {
          return <EditRow action={onEdit} name="value" row={row.original} />;
        },
      },
      {
        id: "actions",
        accessorKey: "id",
        header: "Actions",
        cell: ({ row }) => (
          <form action={onDelete} className="pl-2">
            <input defaultValue={row.original.id} name="id" type="hidden" />
            <Button
              className="mx-auto p-0 h-4 gap-x-2 justify-start hover:text-destructive"
              tooltip="Delete Params"
              type="submit"
              variant="none"
            >
              <span className="sr-only">Delete Params</span>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </form>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  return columns;
}
