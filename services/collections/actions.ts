"use server";

import { revalidateTag, unstable_cache as cache } from "next/cache";

import { TAGS } from "@/constants/tags";
import { getUser } from "@/services/auth";
import {
  createCollection,
  deleteCollection,
  getCollectionById,
  getUserCollections,
  putCollection,
} from "@/services/collections";
import { UpdateCollectionState } from "@/services/collections/types";

export const getCollections = cache(
  async (formData?: FormData) => {
    const user = await getUser();

    if (!user?.id) {
      return {
        data: null,
        message: "Collections not retrieved",
        success: false,
      };
    }

    const response = await getUserCollections(user?.id);

    const search = String(formData?.get("search") || "");

    const filteredCollections = search
      ? response?.data?.filter((collection) =>
          collection.name.toLowerCase().includes(search.toLowerCase())
        )
      : response.data;

    return {
      ...response,
      data: filteredCollections || [],
    };
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

  const response = await getCollectionById(id);

  return response;
};

export const createNewCollection = async (formData: FormData) => {
  const user = await getUser();

  const name = String(formData.get("name") ?? "");

  if (!user?.id || !name) {
    return null;
  }

  const response = await createCollection({
    name,
    userId: user?.id,
  });

  revalidateTag(TAGS.COLLECTION.ALL);

  return response;
};

export const deleteCollectionAction = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user || !id) {
    return null;
  }

  const response = await deleteCollection(id);

  revalidateTag(TAGS.COLLECTION.ALL);

  return response;
};

export const updateCollection = async (
  prevState: UpdateCollectionState,
  formData: FormData
) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  const name = String(formData.get("name") || "");

  if (!user || !id || !name) {
    return {
      errorMessages: {
        name: "Name is required",
      },
      data: prevState.data,
    };
  }

  const response = await putCollection(id, {
    name,
    userId: user?.id,
  });

  revalidateTag(TAGS.COLLECTION.ALL);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};
