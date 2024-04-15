/* eslint-disable @typescript-eslint/no-implied-eval */
import { fetcher } from "@/services/response";
import { Handler, TestResult } from "@/types";

const blackList: string[] = [
  "process",
  "require",
  "global",
  "module",
  "eval",
  "Function",
  "db",
  "prisma",
];

class TestExecutor {
  testResults: TestResult[] = [];

  result: Awaited<ReturnType<typeof fetcher>>;

  handlers: Handler;

  message: string;

  constructor(result: Awaited<ReturnType<typeof fetcher>>, handlers: Handler) {
    this.result = result;
    this.handlers = handlers;
    this.message = "";
  }

  executeTest(test: string): TestResult[] {
    blackList.forEach((item) => {
      if (test.includes(item)) {
        throw new Error(`ReferenceError: ${item} is not defined`);
      }
    });

    const requester = {
      test: (message: string, callback: () => void) => {
        if (!callback) {
          throw new Error(
            "Requester test function requires a callback function"
          );
        }

        this.message = message;

        callback();
      },
      response: {
        to: {
          have: {
            status: (status: unknown) => {
              const passed = status === this.result.status;

              const result = {
                expected: status,
                actual: this.result.status,
                passed,
                resultMessage: this.message,
              };

              if (!passed) {
                result.resultMessage = `${this.message} | AssertionError: Expected status code to be ${status}, but got ${this.result.status}`;
              }

              this.testResults.push(result);
            },
          },
        },
        data: this.result.data,
        status: this.result.status,
      },
      environment: {
        set: (key: string, value: unknown) => {
          this.handlers.environment.set(key, value);
        },
        replace: (key: string, value: unknown) => {
          this.handlers.environment.replace(key, value);
        },
        get: (key: string) => {
          return this.handlers.environment.get(key);
        },
        unset: (key: string) => {
          this.handlers.environment.unset(key);
        },
      },
      helpers: {
        isEqual: (value: unknown, expected: unknown) => {
          const passed = value === expected;

          const result = {
            expected,
            actual: value,
            passed,
            resultMessage: this.message,
          };

          if (!passed) {
            result.resultMessage = `${this.message} | AssertionError: Expected ${value} to be equal to ${expected}`;
          }

          this.testResults.push(result);
        },
      },
    };

    // Override Global or Database functions for security reasons, add more if needed
    window.console.clear = () => {};

    // Execute the test
    const testFunction = new Function("requester", test);

    testFunction(requester);

    return this.testResults;
  }
}

export const executeTests = async (
  test: string,
  result: Awaited<ReturnType<typeof fetcher>>,
  handlers: Handler
) => {
  const executor = new TestExecutor(result, handlers);

  return executor.executeTest(test);
};
