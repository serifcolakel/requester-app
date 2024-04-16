/* eslint-disable @typescript-eslint/naming-convention */
declare class requester {
  test(message: string, callback: () => void): void;
  expect: (value: unknown) => {
    to: {
      be: {
        below: (value: number) => void;
        above: (value: number) => void;
        equal: (value: unknown) => void;
      };
      not: {
        be: {
          below: (value: number) => void;
          above: (value: number) => void;
          equal: (value: unknown) => void;
        };
      };
    };
  };

  response: {
    to: {
      have: {
        status(status: number): void;
      };
    };
    data: unknown;
    status: number;
  };

  environment: {
    set(key: string, value: unknown): void;
    replace(key: string, value: unknown): void;
    get(key: string): unknown;
    unset(key: string): void;
  };

  helpers: {
    isEqual(value: unknown, expected: unknown): void;
  };
}
