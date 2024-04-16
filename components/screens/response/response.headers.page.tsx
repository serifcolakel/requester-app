import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import CopyText from "@/components/copy-text";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";

type Props = {
  parsedHeaders: {
    [k: string]: string;
  };
};

const columns: ColumnDef<Record<string, string>>[] = [
  {
    id: "key",
    accessorKey: "key",
    header: "Key",
    cell: ({ getValue }) => (
      <div className="relative w-full">
        <Input
          readOnly
          className="w-full h-8"
          defaultValue={String(getValue())}
        />
        <div className="absolute transform translate-x-full -translate-y-1/2 right-10 top-1/2">
          <CopyText text={String(getValue())} />
        </div>
      </div>
    ),
  },
  {
    id: "value",
    accessorKey: "value",
    header: "Value",
    cell: ({ getValue }) => (
      <div className="relative w-full">
        <Input
          readOnly
          className="w-full h-8"
          defaultValue={String(getValue())}
        />
        <div className="absolute transform translate-x-full -translate-y-1/2 right-10 top-1/2">
          <CopyText text={String(getValue())} />
        </div>
      </div>
    ),
  },
];

export default function ResponseHeadersPage({ parsedHeaders }: Props) {
  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={Object.entries(parsedHeaders).map(([key, value]) => ({
          key,
          value,
        }))}
      />
    </div>
  );
}
