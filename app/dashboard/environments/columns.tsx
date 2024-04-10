"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableActions } from "@/app/dashboard/environments/data-table-actions";
import EditRow from "@/app/dashboard/environments/edit-row";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { updateVariable } from "@/services/variables/actions";
import { Variable } from "@prisma/client";

export const columns: ColumnDef<Variable>[] = [
  {
    id: "select",
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
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      return <EditRow action={updateVariable} name="name" row={row.original} />;
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Value" />;
    },
    cell: ({ row }) => {
      return (
        <EditRow action={updateVariable} name="value" row={row.original} />
      );
    },
  },
  {
    id: "actions",
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => <DataTableActions row={row} />,
  },
];
