/**
 * @description: Base service response type
 */
export type BaseServiceResponse<T> = {
  data: Nullable<T>;
  message: string;
  success: boolean;
  details?: string;
};

/**
 * @description: Nullable type
 */
export type Nullable<T> = T | null;

/**
 * @description: Test Handler type
 */
export type Handler = {
  environment: {
    set: (key: string, value: unknown) => void;
    replace: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
    unset: (key: string) => void;
  };
};

/**
 * @description: Test result type
 */
export type TestResult = {
  expected: unknown;
  actual: unknown;
  passed: boolean;
  resultMessage: string;
};
