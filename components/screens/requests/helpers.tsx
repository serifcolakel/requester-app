import { Method } from "@prisma/client";

export const getRequestColorClass = (method: Method | string | undefined) => {
  switch (method) {
    case "GET":
      return "!text-green-500";
    case "POST":
      return "!text-yellow-500";
    case "PUT":
      return "!text-blue-500";
    case "DELETE":
      return "!text-red-500";
    default:
      return "!text-blue-800";
  }
};
