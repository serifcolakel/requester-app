export type Requester = {
  test: (message: string, callback: () => void) => void;
  response: {
    to: {
      have: {
        status: (status: unknown) => void;
      };
    };
    data: unknown;
    status: number;
  };
  environment: {
    set: (key: string, value: unknown) => void;
    replace: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    unset: (key: string) => void;
  };
  helpers: {
    isEqual: (value: unknown, expected: unknown) => void;
  };
};

export type Handler = {
  environment: {
    set: (key: string, value: unknown) => void;
    replace: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    unset: (key: string) => void;
  };
};
