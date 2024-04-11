"use server";

import {
  revalidatePath,
  revalidateTag,
  unstable_cache as cache,
} from "next/cache";

import { TAGS } from "@/constants/tags";
import { getUser } from "@/services/auth";
import {
  createRequest,
  getAllRequests,
  getCollectionRequests,
  putRequest,
  removeRequest,
} from "@/services/requests";
import { REQUEST_TYPE_OPTIONS } from "@/services/requests/constants";
import {
  createRequestSchema,
  updateRequestSchema,
} from "@/services/requests/schemas";
import { CreateRequest, UpdateRequest } from "@/services/requests/types";

export const getAllRequestsService = cache(
  async (formData?: FormData) => {
    const user = await getUser();

    const search = String(formData?.get("search") || "");

    if (!user?.id) {
      return {
        data: [],
        message: "Requests not retrieved",
        success: false,
      };
    }

    const response = await getAllRequests();

    return {
      ...response,
      data:
        (search
          ? response.data?.filter((variable) =>
              variable.name.toLowerCase().includes(search.toLowerCase())
            )
          : response.data) || [],
    };
  },
  [],
  {
    tags: [TAGS.REQUEST.ALL],
    revalidate: 2,
  }
);

export const getCollectionRequestsService = async (collectionId: string) => {
  const user = await getUser();

  if (!user || !collectionId) {
    let message = "Variables not retrieved";

    if (!user) {
      message = "User not found";
    }

    if (!collectionId) {
      message = "Collection not found";
    }

    return {
      data: [],
      message,
      success: false,
    };
  }

  const response = await getCollectionRequests(collectionId);

  return {
    ...response,
    data: response.data || [],
  };
};

export const createNewRequest = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "Request not created",
      data: null,
    };
  }

  const formValues: CreateRequest = {
    name: String(formData.get("name") || ""),
    collectionId: String(formData.get("collectionId") || ""),
    method:
      REQUEST_TYPE_OPTIONS.find(
        (option) => option.label === formData.get("method")
      )?.value || "GET",
    url: String(formData.get("url") || ""),
    body: String(formData.get("body") || ""),
  };

  const request = createRequestSchema.parse(formValues);

  const response = await createRequest(request);

  revalidateTag(TAGS.REQUEST.ALL);
  revalidateTag(TAGS.COLLECTION.ALL);

  return response;
};

export const updateRequest = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "Variable not updated",
      data: null,
    };
  }

  const formValues: UpdateRequest = {
    name: String(formData.get("name") || ""),
    collectionId: String(formData.get("collectionId") || ""),
    method:
      REQUEST_TYPE_OPTIONS.find(
        (option) => option.label === formData.get("method")
      )?.value || "GET",
    url: String(formData.get("url") || ""),
    body: String(formData.get("body") || ""),
    id: String(formData.get("id") || ""),
  };

  const updatedRequest = updateRequestSchema.parse(formValues);

  const response = await putRequest(updatedRequest);

  revalidateTag(TAGS.COLLECTION.ALL);
  revalidatePath(`/collections/${formValues.collectionId}/${formValues.id}`);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteRequest = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user?.id || !id) {
    return {
      success: false,
      message: "Variable not deleted",
      data: null,
    };
  }

  const response = await removeRequest(id);

  if (response.success) {
    revalidateTag(TAGS.VARIABLE.ALL);
  }

  return response;
};
