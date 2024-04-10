import React, { PropsWithChildren } from "react";

import CollectionListWrapper from "@/components/screens/collections/collection.list.wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getCollections } from "@/services/collections/actions";

export default async function Layout({ children }: PropsWithChildren) {
  const { data: collections = [] } = await getCollections();

  return (
    <ResizablePanelGroup className="items-stretch" direction="horizontal">
      <ResizablePanel collapsible minSize={15}>
        <CollectionListWrapper collections={collections || []} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={70}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
}
