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
  createAuthorization,
  getAllAuthorizations,
  getAuthorizations,
  putAuthorization,
  removeAuthorization,
} from "@/services/authorization";
import { AuthType } from "@prisma/client";

export const getAllAuthorization = cache(
  async (formData?: FormData) => {
    const user = await getUser();

    const search = String(formData?.get("search") || "");

    if (!user?.id) {
      return {
        data: [],
        message: "Environments not retrieved",
        success: false,
      };
    }

    const response = await getAllAuthorizations();

    return {
      ...response,
      data:
        (search
          ? response.data?.filter((auth) =>
              auth.token.toLowerCase().includes(search.toLowerCase())
            )
          : response.data) || [],
    };
  },
  [],
  {
    tags: [TAGS.AUTHORIZATION.ALL],
    revalidate: 2,
  }
);

export const getAuthorizationByRequestId = async (requestId: string) => {
  const user = await getUser();

  if (!user || !requestId) {
    let message = "Authorizations not retrieved";

    if (!user) {
      message = "User not found";
    }

    if (!requestId) {
      message = "requestId not found";
    }

    return {
      data: [],
      message,
      success: false,
    };
  }

  const response = await getAuthorizations(requestId);

  return {
    ...response,
    data: response.data || [],
  };
};

export const createNewAuthorization = async (formData: FormData) => {
  const user = await getUser();

  const type = formData.get("type") as AuthType | null;

  const token = String(formData.get("token") || "");

  const requestId = String(formData.get("requestId") || "");

  if (!user?.id || !type || !token || !requestId) {
    let message = "Authorization not created";

    if (!user?.id) {
      message = "User not found";
    }

    if (!type) {
      message = "type is required";
    }

    if (!token) {
      message = "token is required";
    }

    if (!requestId) {
      message = "Environment is required";
    }

    return {
      success: false,
      message,
      data: null,
    };
  }

  const response = await createAuthorization(type, token, requestId);

  revalidateTag(TAGS.AUTHORIZATION.ALL);
  revalidatePath(paths.dashboard.collections);

  return response;
};

export const updateAuthorization = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  const type = formData.get("type") as AuthType | null;

  const token = String(formData.get("token") || "");

  const requestId = String(formData.get("requestId") || "");

  if (!user?.id || !type || !id || !token || !requestId) {
    let message = "Authorization not updated";

    if (!user?.id) {
      message = "User not found";
    }

    if (!type) {
      message = "type is required";
    }

    if (!token) {
      message = "token is required";
    }

    if (!requestId) {
      message = "Environment is required";
    }

    return {
      errorMessages: {
        general: message,
      },
    };
  }

  const response = await putAuthorization(id, type, token, requestId);

  revalidateTag(TAGS.AUTHORIZATION.ALL);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteAuthorization = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user?.id || !id) {
    return {
      success: false,
      message: "Authorization not deleted",
      data: null,
    };
  }

  const response = await removeAuthorization(id);

  if (response.success) {
    revalidateTag(TAGS.AUTHORIZATION.ALL);
  }

  return response;
};
