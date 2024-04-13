"use client";

import React, { FormHTMLAttributes } from "react";
import { PlusCircleIcon } from "lucide-react";

import { DataTable } from "@/components/data-table";
import useColumns from "@/components/screens/params/use.columns";
import { Button } from "@/components/ui/button";
import { Header } from "@prisma/client";

type Props = {
  headers: Header[];
  requestId: string;
  onAdd: (data: FormData) => void;
  onDelete: (data: FormData) => void;
  onEdit: (data: FormData) => void;
  loading: boolean;
};

function AddForm({
  requestId,
  action,
}: {
  requestId: string;
  action?: FormHTMLAttributes<HTMLFormElement>["action"];
}) {
  return (
    <form action={action}>
      <input defaultValue="Initial Key" name="key" type="hidden" />
      <input defaultValue="Value" name="value" type="hidden" />
      <input defaultValue={requestId} name="requestId" type="hidden" />
      <Button
        className=" my-2 px-2 h-8 mr-2"
        tooltip="Add new params"
        type="submit"
        variant="icon"
      >
        <PlusCircleIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}

export default function Table({
  headers,
  requestId,
  onAdd,
  loading,
  onDelete,
  onEdit,
}: Props) {
  const columns = useColumns({ onDelete, onEdit });

  return (
    <div className="w-full h-100 overflow-y-scroll">
      <DataTable
        columns={columns}
        data={headers}
        loading={loading}
        toolbarProps={{
          children: <AddForm action={onAdd} requestId={requestId} />,
        }}
      />
    </div>
  );
}
