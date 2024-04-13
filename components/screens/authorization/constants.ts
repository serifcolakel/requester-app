import { AuthType } from "@prisma/client";

export const authorizationTypes: { label: string; value: AuthType }[] = [
  {
    label: "Bearer Token",
    value: "BEARER",
  },
];
