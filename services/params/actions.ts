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
  createParams,
  getAllParams,
  getRequestParamsById,
  putParams,
  removeParams,
} from "@/services/params";

export const getAllVariables = cache(
  async (formData?: FormData) => {
    const user = await getUser();

    const search = String(formData?.get("search") || "");

    if (!user?.id) {
      return {
        data: [],
        message: "Params not retrieved",
        success: false,
      };
    }

    const response = await getAllParams();

    return {
      ...response,
      data:
        (search
          ? response.data?.filter((variable) =>
              variable.key.toLowerCase().includes(search.toLowerCase())
            )
          : response.data) || [],
    };
  },
  [],
  {
    tags: [TAGS.PARAMS.ALL],
    revalidate: 2,
  }
);

export const getRequestParams = async (requestId: string) => {
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

  const response = await getRequestParamsById(requestId);

  return {
    ...response,
    data: response.data || [],
  };
};

export const createNewParams = async (formData: FormData) => {
  const user = await getUser();

  const key = String(formData.get("key") || "");

  const value = String(formData.get("value") || "");

  const requestId = String(formData.get("requestId") || "");

  if (!user?.id || !key || !value || !requestId) {
    let message = "Variable not created";

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

  const response = await createParams({ key, value, requestId });

  revalidateTag(TAGS.PARAMS.ALL);
  revalidatePath(paths.dashboard.collections);

  return response;
};

export const updateParams = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  const key = String(formData.get("key") || "");

  const value = String(formData.get("value") || "");

  const requestId = String(formData.get("requestId") || "");

  if (!user?.id || !key || !id || !value || !requestId) {
    let message = "Variable not updated";

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

  const response = await putParams({ key, value, requestId, id });

  revalidateTag(TAGS.PARAMS.ALL);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteParams = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user?.id || !id) {
    return {
      success: false,
      message: "Variable not deleted",
      data: null,
    };
  }

  const response = await removeParams(id);

  if (response.success) {
    revalidateTag(TAGS.PARAMS.ALL);
  }

  return response;
};
