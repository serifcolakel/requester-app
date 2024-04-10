import { Collection } from "@prisma/client";

export type UpdateCollectionState = {
  errorMessages: {
    name: string | null;
  };
  data: Collection | null;
};
