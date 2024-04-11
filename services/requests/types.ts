import { z } from "zod";

import {
  createRequestSchema,
  updateRequestSchema,
} from "@/services/requests/schemas";
import { Variable } from "@prisma/client";

export type UpdateVariableState = {
  errorMessages: {
    general: string | null;
  };
  data: Variable | null;
};

export type CreateRequest = z.infer<typeof createRequestSchema>;

export type UpdateRequest = z.infer<typeof updateRequestSchema>;
