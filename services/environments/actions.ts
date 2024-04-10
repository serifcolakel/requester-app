"use server";

import { revalidateTag, unstable_cache as cache } from "next/cache";

import { TAGS } from "@/constants/tags";
import { getUser } from "@/services/auth";
import {
  createEnvironment,
  getEnvironment,
  getUserEnvironments,
  putEnvironment,
  removeEnvironment,
} from "@/services/environments";
import { UpdateEnvironmentState } from "@/services/environments/types";

export const getEnvironments = cache(
  async (formData?: FormData) => {
    const user = await getUser();

    if (!user?.id) {
      return {
        data: [],
        message: "Environments not retrieved",
        success: false,
      };
    }

    const response = await getUserEnvironments(user?.id);

    const search = String(formData?.get("search") || "");

    const filteredEnvironments = search
      ? response?.data?.filter((environment) =>
          environment.name.toLowerCase().includes(search.toLowerCase())
        )
      : response.data;

    return {
      ...response,
      data: filteredEnvironments || [],
    };
  },
  [],
  {
    tags: [TAGS.ENVIROMENT.ALL],
    revalidate: 2,
  }
);

export const getEnvironmentById = async (id: string) => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const response = await getEnvironment(id);

  return response;
};

export const createNewEnvironment = async (formData: FormData) => {
  const user = await getUser();

  const name = String(formData.get("name") || "");

  if (!user?.id || !name) {
    return {
      success: false,
      message: "Environment not created",
      data: null,
    };
  }

  const response = await createEnvironment(name, user?.id);

  revalidateTag(TAGS.ENVIROMENT.ALL);

  return response;
};

export const updateEnvironment = async (
  prevState: UpdateEnvironmentState,
  formData: FormData
) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  const name = String(formData.get("name") || "");

  if (!user?.id || !name || !id) {
    return {
      errorMessages: {
        name: "Name is required",
      },
      data: prevState.data,
    };
  }

  const response = await putEnvironment(id, name);

  revalidateTag(TAGS.ENVIROMENT.ALL);

  return {
    errorMessages: {
      name: null,
    },
    data: response.data,
  };
};

export const deleteEnvironment = async (formData: FormData) => {
  const user = await getUser();

  const id = String(formData.get("id") || "");

  if (!user?.id || !id) {
    return {
      success: false,
      message: "Environment not deleted",
      data: null,
    };
  }

  const response = await removeEnvironment(id);

  if (response?.data?.userId !== user.id) {
    return {
      success: false,
      message: "Environment not deleted",
      data: null,
    };
  }

  revalidateTag(TAGS.ENVIROMENT.ALL);

  return response;
};
