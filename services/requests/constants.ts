import { Method } from "@prisma/client";

export const REQUEST_TYPE: Record<keyof typeof Method, Method> = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const REQUEST_TYPE_OPTIONS = Object.keys(REQUEST_TYPE).map((key) => ({
  label: key,
  value: REQUEST_TYPE[key as keyof typeof REQUEST_TYPE],
}));
