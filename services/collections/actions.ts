"use server";

import { revalidateTag, unstable_cache as cache } from "next/cache";

import { TAGS } from "@/constants/tags";
import { getUser } from "@/services/auth";
import {
  createCollection,
  deleteCollection,
  getCollectionById,
  getUserCollections,
} from "@/services/collections";

export const getCollections = cache(
  async () => {
    const user = await getUser();

    if (!user?.id) {
      return {
        data: null,
        message: "Collections not retrieved",
        success: false,
      };
    }

    const collections = await getUserCollections(user?.id);

    return collections;
  },
  [],
  {
    tags: [TAGS.COLLECTION.ALL],
    revalidate: 2,
  }
);

export const getCollectionDetail = async (id: string) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const collection = await getCollectionById(id);

  return collection;
};

export const createNewCollection = async (formData: FormData) => {
  const user = await getUser();

  const name = String(formData.get("name"));

  if (!user?.id || !name) {
    return null;
  }

  const collection = await createCollection({
    name,
    userId: user?.id,
  });

  revalidateTag(TAGS.COLLECTION.ALL);

  return collection;
};

export const deleteCollectionAction = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id"));

  if (!user || !id) {
    return null;
  }

  const collection = await deleteCollection(id);

  revalidateTag(TAGS.COLLECTION.ALL);

  return collection;
};
