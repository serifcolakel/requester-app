"use client";

import React from "react";

import List from "@/components/list";
import CollectionItem from "@/components/screens/collections/collection.item";
import { Collection } from "@prisma/client";

export default function CollectionList({
  collections,
  listProps,
}: {
  collections: Collection[];
  listProps?: Omit<React.ComponentProps<typeof List>, "items" | "renderItem">;
}) {
  return (
    <List
      {...listProps}
      items={collections || []}
      renderItem={(collection) => (
        <CollectionItem collection={collection} key={collection.id} />
      )}
    />
  );
}
