"use server";

import { getUser } from "@/services/auth";
import {
  createBody,
  getRequestBodyById,
  putBody,
  removeBody,
} from "@/services/body";
import { BodyType } from "@prisma/client";

export const getRequestBody = async (requestId: string) => {
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

  const response = await getRequestBodyById(requestId);

  return {
    ...response,
    data: response.data || [],
  };
};

export const createNewBody = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "User not found",
      data: null,
    };
  }

  const content = formData.get("content") as string;

  const type = formData.get("type") as BodyType;

  const requestId = formData.get("requestId") as string;

  if (!content || !type || !requestId) {
    return {
      success: false,
      message: "Invalid data",
      data: null,
    };
  }

  const response = await createBody({ content, type, requestId });

  return response;
};

export const updateBody = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "User not found",
      data: null,
    };
  }

  const content = formData.get("content") as string;

  const type = formData.get("type") as BodyType;

  const requestId = formData.get("requestId") as string;

  const id = formData.get("id") as string;

  if (!content || !type || !requestId || !id) {
    return {
      success: false,
      message: "Invalid data",
      data: null,
    };
  }

  const response = await putBody({ content, type, requestId, id });

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteParams = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "User not found",
      data: null,
    };
  }

  const id = formData.get("id") as string;

  if (!id) {
    return {
      success: false,
      message: "Invalid data",
      data: null,
    };
  }

  const response = await removeBody(id);

  return response;
};
