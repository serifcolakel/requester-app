import React from "react";

import EnvironmentsListWrapper from "@/components/screens/environments/environments.list.wrapper";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { getEnvironments } from "@/services/environments/actions";

export default async function Page() {
  const { data: environments = [] } = await getEnvironments();

  return (
    <ResizablePanelGroup className="items-stretch" direction="horizontal">
      <ResizablePanel collapsible minSize={15}>
        <EnvironmentsListWrapper environments={environments} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="p-4" minSize={70}>
        <div>content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
