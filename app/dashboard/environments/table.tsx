"use client";

import React, { useState } from "react";

import { columns } from "@/app/dashboard/environments/columns";
import { DataTable } from "@/components/data-table";
import { Environment } from "@prisma/client";

type Props = {
  initialData: Environment[];
};

export default function Table({ initialData }: Props) {
  const [data, setData] = useState(initialData);

  return <DataTable columns={columns} data={data} setData={setData} />;
}
