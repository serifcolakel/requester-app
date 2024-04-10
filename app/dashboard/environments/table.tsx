"use client";

import React, { FormHTMLAttributes, useOptimistic } from "react";
import { PlusCircleIcon } from "lucide-react";

import { columns } from "@/app/dashboard/environments/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { createNewVariable } from "@/services/variables/actions";
import { Variable } from "@prisma/client";

type Props = {
  initialData: Variable[];
  id: string;
};

function AddForm({
  id,
  action,
}: {
  id: string;
  action?: FormHTMLAttributes<HTMLFormElement>["action"];
}) {
  return (
    <form action={action}>
      <input defaultValue="Name" name="name" type="hidden" />
      <input defaultValue="Value" name="value" type="hidden" />
      <input defaultValue={id} name="environmentId" type="hidden" />
      <Button
        className=" my-2 px-2 h-8 mr-2"
        tooltip="Add new variable"
        type="submit"
        variant="icon"
      >
        <PlusCircleIcon className="w-4 h-4" />
      </Button>
    </form>
  );
}

export default function Table({ initialData, id }: Props) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Variable[],
    Variable
  >(initialData, (state, newMessage) => [...state, newMessage]);

  const onCreate = async (formData: FormData) => {
    const response = await createNewVariable(formData);

    if (response.success && response.data) {
      addOptimisticMessage(response.data);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={optimisticMessages}
      toolbarProps={{
        children: <AddForm action={onCreate} id={id} />,
      }}
    />
  );
}
