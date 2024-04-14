import { z } from "zod";

const bodyActionSchema = z.object({
  content: z.string(),
  type: z.enum(["RAW", "FORM_DATA"]),
  requestId: z.string(),
});

const bodyIdSchema = z.object({
  id: z.string(),
});

export { bodyActionSchema, bodyIdSchema };
