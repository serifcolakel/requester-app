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
