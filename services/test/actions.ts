"use server";

import { getUser } from "@/services/auth";
import {
  createTest,
  getRequestTestById,
  putTest,
  removeTest,
} from "@/services/test";

export const getRequestTest = async (requestId: string) => {
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
      data: null,
      message,
      success: false,
    };
  }

  const response = await getRequestTestById(requestId);

  return response;
};

export const createNewTest = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "User not found",
      data: null,
    };
  }

  const script = String(formData.get("script") ?? "");

  const requestId = String(formData.get("requestId") ?? "");

  if (!script || !requestId) {
    return {
      success: false,
      message: "Invalid data",
      data: null,
    };
  }

  const response = await createTest({ script, requestId });

  return response;
};

export const updateTest = async (formData: FormData) => {
  const user = await getUser();

  if (!user?.id) {
    return {
      success: false,
      message: "User not found",
      data: null,
    };
  }

  const script = String(formData.get("script") ?? "");

  const requestId = String(formData.get("requestId") ?? "");

  const id = formData.get("id") as string;

  if (!script || !requestId || !id) {
    return {
      success: false,
      message: "Invalid data",
      data: null,
    };
  }

  const response = await putTest({ script, requestId, id });

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteTest = async (formData: FormData) => {
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

  const response = await removeTest(id);

  return response;
};
