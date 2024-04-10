"use client";

import React from "react";

import List from "@/components/list";
import EnvironmentItem from "@/components/screens/environments/environments.item";
import { Environment } from "@prisma/client";

export default function EnvironmentList({
  environments,
  listProps,
}: {
  environments: Environment[];
  listProps?: Omit<React.ComponentProps<typeof List>, "items" | "renderItem">;
}) {
  return (
    <List
      {...listProps}
      items={environments || []}
      renderItem={(environment) => (
        <EnvironmentItem environment={environment} key={environment.id} />
      )}
    />
  );
}
