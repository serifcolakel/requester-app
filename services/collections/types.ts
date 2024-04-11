import { Collection, Request } from "@prisma/client";

export type UpdateCollectionState = {
  errorMessages: {
    name: string | null;
  };
  data: Collection | null;
};

export type CollectionDetailItem = Collection & { requests?: Request[] };
