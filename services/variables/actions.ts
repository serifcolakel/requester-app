"use server";

import {
  revalidatePath,
  revalidateTag,
  unstable_cache as cache,
} from "next/cache";

import { TAGS } from "@/constants/tags";
import { getUser } from "@/services/auth";
import {
  createVariable,
  getAllVariables as getVariablesService,
  getVariables,
  putVariable,
  removeVariable,
} from "@/services/variables";

export const getAllVariables = cache(
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

    const response = await getVariablesService();

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
    tags: [TAGS.VARIABLE.ALL],
    revalidate: 2,
  }
);

export const getVariablesById = async (environmentId: string) => {
  const user = await getUser();

  if (!user || !environmentId) {
    let message = "Variables not retrieved";

    if (!user) {
      message = "User not found";
    }

    if (!environmentId) {
      message = "Environment not found";
    }

    return {
      data: [],
      message,
      success: false,
    };
  }

  const response = await getVariables(environmentId);

  return {
    ...response,
    data: response.data || [],
  };
};

export const createNewVariable = async (formData: FormData) => {
  const user = await getUser();

  const name = String(formData.get("name") || "");

  const value = String(formData.get("value") || "");

  const environmentId = String(formData.get("environmentId") || "");

  if (!user?.id || !name || !value || !environmentId) {
    let message = "Variable not created";

    if (!user?.id) {
      message = "User not found";
    }

    if (!name) {
      message = "Name is required";
    }

    if (!value) {
      message = "Value is required";
    }

    if (!environmentId) {
      message = "Environment is required";
    }

    return {
      success: false,
      message,
      data: null,
    };
  }

  const response = await createVariable(name, value, environmentId);

  revalidateTag(TAGS.VARIABLE.ALL);
  revalidatePath("/dashboard/environments");

  return response;
};

export const updateVariable = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  const name = String(formData.get("name") || "");

  const value = String(formData.get("value") || "");

  const environmentId = String(formData.get("environmentId") || "");

  if (!user?.id || !name || !id || !value || !environmentId) {
    let message = "Variable not updated";

    if (!user?.id) {
      message = "User not found";
    }

    if (!name) {
      message = "Name is required";
    }

    if (!value) {
      message = "Value is required";
    }

    if (!environmentId) {
      message = "Environment is required";
    }

    return {
      errorMessages: {
        general: message,
      },
    };
  }

  const response = await putVariable(id, name, value, environmentId);

  revalidateTag(TAGS.VARIABLE.ALL);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteVariable = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user?.id || !id) {
    return {
      success: false,
      message: "Variable not deleted",
      data: null,
    };
  }

  const response = await removeVariable(id);

  if (response.success) {
    revalidateTag(TAGS.VARIABLE.ALL);
  }

  return response;
};
