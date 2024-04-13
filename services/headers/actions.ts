"use server";

import {
  revalidatePath,
  revalidateTag,
  unstable_cache as cache,
} from "next/cache";

import { paths } from "@/constants/paths";
import { TAGS } from "@/constants/tags";
import { getUser } from "@/services/auth";
import {
  createHeader,
  getAllHeader,
  getRequestHeaderById,
  putHeader,
  removeHeader,
} from "@/services/headers";

export const getAllHeaders = cache(
  async (formData?: FormData) => {
    const user = await getUser();

    const search = String(formData?.get("search") || "");

    if (!user?.id) {
      return {
        data: [],
        message: "Header not retrieved",
        success: false,
      };
    }

    const response = await getAllHeader();

    return {
      ...response,
      data:
        (search
          ? response.data?.filter((header) =>
              header.key.toLowerCase().includes(search.toLowerCase())
            )
          : response.data) || [],
    };
  },
  [],
  {
    tags: [TAGS.HEADER.ALL],
    revalidate: 2,
  }
);

export const getRequestHeader = async (requestId: string) => {
  const user = await getUser();

  if (!user || !requestId) {
    let message = "Request not retrieved";

    if (!user) {
      message = "User not found";
    }

    if (!requestId) {
      message = "RequestID is required";
    }

    return {
      data: [],
      message,
      success: false,
    };
  }

  const response = await getRequestHeaderById(requestId);

  return {
    ...response,
    data: response.data || [],
  };
};

export const createNewHeader = async (formData: FormData) => {
  const user = await getUser();

  const key = String(formData.get("key") || "");

  const value = String(formData.get("value") || "");

  const requestId = String(formData.get("requestId") || "");

  if (!user?.id || !key || !value || !requestId) {
    let message = "header not created";

    if (!user?.id) {
      message = "User not found";
    }

    if (!key) {
      message = "key is required";
    }

    if (!value) {
      message = "value is required";
    }

    if (!requestId) {
      message = "requestId is required";
    }

    return {
      success: false,
      message,
      data: null,
    };
  }

  const response = await createHeader({ key, value, requestId });

  revalidateTag(TAGS.HEADER.ALL);
  revalidatePath(paths.dashboard.collections);

  return response;
};

export const updateHeader = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  const key = String(formData.get("key") || "");

  const value = String(formData.get("value") || "");

  const requestId = String(formData.get("requestId") || "");

  if (!user?.id || !key || !id || !value || !requestId) {
    let message = "Header not updated";

    if (!user?.id) {
      message = "User not found";
    }

    if (!key) {
      message = "key is required";
    }

    if (!value) {
      message = "Value is required";
    }

    if (!requestId) {
      message = "requestId is required";
    }

    return {
      errorMessages: {
        general: message,
      },
    };
  }

  const response = await putHeader({ key, value, requestId, id });

  revalidateTag(TAGS.HEADER.ALL);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteHeader = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user?.id || !id) {
    return {
      success: false,
      message: "Header not deleted",
      data: null,
    };
  }

  const response = await removeHeader(id);

  if (response.success) {
    revalidateTag(TAGS.HEADER.ALL);
  }

  return response;
};
