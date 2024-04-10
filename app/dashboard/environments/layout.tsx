import React, { PropsWithChildren } from "react";

import EnvironmentsListWrapper from "@/components/screens/environments/environments.list.wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getEnvironments } from "@/services/environments/actions";

export default async function Layout({ children }: PropsWithChildren) {
  const { data: environments = [] } = await getEnvironments();

  return (
    <ResizablePanelGroup className="items-stretch" direction="horizontal">
      <ResizablePanel collapsible minSize={15}>
        <EnvironmentsListWrapper environments={environments} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="!overflow-y-auto" minSize={70}>
        {children}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
