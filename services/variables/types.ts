import { Variable } from "@prisma/client";

export type UpdateVariableState = {
  errorMessages: {
    general: string | null;
  };
  data: Variable | null;
};
