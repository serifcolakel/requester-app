import React from "react";

import EmptyState from "@/components/empty-states/empty.state";
import ResponseBodyPage from "@/components/screens/response/response.body.page";
import ResponseHeader from "@/components/screens/response/response.header";
import ResponseHeadersPage from "@/components/screens/response/response.headers.page";
import ResponseTypePage from "@/components/screens/response/response.type.page";
import TestResultsPage from "@/components/screens/response/test.results.page";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RequestInfo } from "@/types/state.types";

type Props = {
  requestInfo: RequestInfo;
};

export default function ResponsePage({ requestInfo }: Props) {
  const { result, testResults } = requestInfo;

  if (!result) {
    return (
      <EmptyState
        className="justify-center bg-white shadow-sm space-y-0"
        description="Send a request to see the response here."
        imageProps={{ className: "p-4", width: 200, height: 200 }}
        src="/illustration-hit-send.svg"
        title="No response yet"
      />
    );
  }

  return (
    <Tabs className="px-4 pt-2" defaultValue="body">
      <ResponseHeader requestInfo={requestInfo} />
      <TabsContent className="relative space-y-1" value="body">
        <ResponseBodyPage data={result.data} />
      </TabsContent>
      <TabsContent className="overflow-y-auto" value="headers">
        <ResponseHeadersPage parsedHeaders={result.parsedHeaders} />
      </TabsContent>
      <TabsContent className="overflow-y-auto" value="test-results">
        <TestResultsPage testResults={testResults} />
      </TabsContent>
      <TabsContent className="relative space-y-1" value="type">
        <ResponseTypePage data={result.data} />
      </TabsContent>
    </Tabs>
  );
}
