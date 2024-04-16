import React from "react";

import EmptyState from "@/components/empty-states/empty.state";
import List from "@/components/list";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestResult } from "@/types";

function PassedTest({ test }: { test: TestResult }) {
  return (
    <div className="flex flew-row gap-x-2 my-2 items-center">
      <Badge className="w-20 justify-center" variant="success">
        Passed
      </Badge>
      <span className="text-gray-500 text-xs">{test.resultMessage}</span>
    </div>
  );
}

function FailedTest({ test }: { test: TestResult }) {
  return (
    <div className="flex flew-row gap-x-2 my-2 items-center">
      <Badge className="w-20 justify-center" variant="destructive">
        Failed
      </Badge>
      <span className="text-gray-500 text-xs">{test.resultMessage}</span>
    </div>
  );
}

export default function TestResultsPage({
  testResults,
}: {
  testResults: TestResult[];
}) {
  if (!testResults.length) {
    return (
      <EmptyState
        className="justify-center bg-white shadow-sm space-y-0"
        description="Write tests to see the results here."
        imageProps={{ className: "p-4", width: 200, height: 200 }}
        src="/illustration-write-tests.svg"
        title="No test results yet"
      />
    );
  }

  const {
    all = [],
    passed = [],
    failed = [],
  } = testResults.reduce(
    (acc, test) => {
      acc.all.push(test);

      if (test.passed) {
        acc.passed.push(test);
      } else {
        acc.failed.push(test);
      }

      return acc;
    },
    { all: [], passed: [], failed: [] } as {
      all: TestResult[];
      passed: TestResult[];
      failed: TestResult[];
    }
  );

  return (
    <Tabs className="px-4 pt-2" defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="passed">Passed</TabsTrigger>
        <TabsTrigger value="failed">Failed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <List
          items={all}
          renderItem={(test) =>
            test.passed ? (
              <PassedTest key={test.resultMessage} test={test} />
            ) : (
              <FailedTest key={test.resultMessage} test={test} />
            )
          }
        />
      </TabsContent>
      <TabsContent value="passed">
        <List
          items={passed}
          renderItem={(test) => (
            <PassedTest key={test.resultMessage} test={test} />
          )}
        />
      </TabsContent>
      <TabsContent value="failed">
        <List
          items={failed}
          renderItem={(test) => (
            <FailedTest key={test.resultMessage} test={test} />
          )}
        />
      </TabsContent>
    </Tabs>
  );
}
