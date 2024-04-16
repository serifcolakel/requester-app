import { fetcher } from "@/services/response";
import { TestResult } from "@/types";

export type RequestInfo = {
  result?: Awaited<ReturnType<typeof fetcher>>;
  testResults: TestResult[];
};
