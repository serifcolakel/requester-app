/**
 * @description: Base service response type
 */
export type BaseServiceResponse<T> = {
  data: Nullable<T>;
  message: string;
  success: boolean;
};

/**
 * @description: Nullable type
 */
export type Nullable<T> = T | null;
