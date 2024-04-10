"use client";

import React from "react";

import EnvironmentFilter from "@/components/screens/environments/environments.filter";
import EnvironmentList from "@/components/screens/environments/environments.list";
import { Environment } from "@prisma/client";

type Props = {
  environments: Environment[];
};

export default function EnvironmentsListWrapper({ environments }: Props) {
  return (
    <div className="w-full h-full">
      <EnvironmentFilter />
      <div className="overflow-y-auto px-4 flex-1 h-[90%]">
        <EnvironmentList
          environments={environments}
          listProps={{
            emptyStateProps: {
              src: "/illustration-no-mock-server.svg",
            },
          }}
        />
      </div>
    </div>
  );
}
