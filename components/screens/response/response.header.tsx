import React from "react";
import { Globe, TimerIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestInfo } from "@/types/state.types";

type Props = {
  requestInfo: RequestInfo;
};

export default function ResponseHeader({ requestInfo }: Props) {
  const { result, testResults } = requestInfo;

  const testResultText = testResults.length ? (
    <>
      Test Results ({testResults.filter((r) => r.passed).length}/
      {testResults.length})
    </>
  ) : (
    "Test Results"
  );

  return (
    <header className="flex flex-row items-center justify-between w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="body">
          Body
        </TabsTrigger>
        <TabsTrigger className="w-full" value="headers">
          Headers
        </TabsTrigger>
        <TabsTrigger className="w-full" value="test-results">
          {testResultText}
        </TabsTrigger>
        <TabsTrigger className="w-full" value="type">
          Type
        </TabsTrigger>
      </TabsList>
      <div className="w-full text-center">
        <Label className="border-b-2 px-2 border-black" variant="h6">
          Response Info
        </Label>
      </div>
      <div className="flex flex-row items-center justify-end divide-x w-full">
        <div className="flex flex-row gap-x-2 items-center justify-center px-2">
          <Globe className="w-4 h-4" />
          <p className="text-xs text-gray-500">
            Status : <span className="text-green-500">{result?.status}</span>
          </p>
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-center px-2">
          <TimerIcon className="w-4 h-4" />
          <p className="text-xs text-gray-500">
            Time :{" "}
            <span className="text-green-500">{result?.responseTime}ms</span>
          </p>
        </div>
      </div>
    </header>
  );
}
