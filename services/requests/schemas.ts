import { z } from "zod";

export const createRequestSchema = z.object({
  name: z.string(),
  collectionId: z.string(),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  url: z.string(),
  body: z.string(),
});

export const updateRequestSchema = z.object({
  collectionId: z.string(),
  id: z.string(),
  name: z.string(),
  method: z.enum(["GET", "POST", "PUT", "DELETE"]),
  url: z.string(),
  body: z.string(),
});
