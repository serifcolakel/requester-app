import { Environment } from "@prisma/client";

export type UpdateEnvironmentState = {
  errorMessages: {
    name: string | null;
  };
  data: Environment | null;
};
