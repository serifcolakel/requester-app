"use client";

import React from "react";

import CollectionFilter from "@/components/screens/collections/collection.filter";
import CollectionList from "@/components/screens/collections/collection.list";
import { Collection } from "@prisma/client";

type Props = {
  collections: Collection[];
};

export default function CollectionListWrapper({ collections }: Props) {
  return (
    <div className="w-full h-full">
      <CollectionFilter />
      <div className="overflow-y-auto px-4 flex-1 h-[90%]">
        <CollectionList collections={collections} />
      </div>
    </div>
  );
}
