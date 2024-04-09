/**
 * @description - The file is the entry point for the environments service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Environment } from "@prisma/client";
/**
 * @description - Get all environments
 * @returns - All environments
 */
export const getAllEnvironments = async (): Promise<
  BaseServiceResponse<Environment[]>
> => {
  try {
    const environments = await db.environment.findMany();

    return {
      data: environments,
      message: "Environments retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Environments not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get environments for a user
 * @param userId - The user ID
 * @returns - The user's environments
 *
 * */
export const getUserEnvironments = async (
  userId: string
): Promise<BaseServiceResponse<Environment[]>> => {
  try {
    const environments = await db.environment.findMany({
      where: {
        userId,
      },
    });

    return {
      data: environments,
      message: "Environments retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Environments not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an environment by ID
 * @param id - The environment ID
 * @returns - The environment
 * */
export const getEnvironment = async (
  id: string
): Promise<BaseServiceResponse<Environment>> => {
  try {
    const environment = await db.environment.findUnique({
      where: {
        id,
      },
    });

    return {
      data: environment,
      message: "Environment retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Environment not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an environment
 * @param data - The environment data
 * @returns - The created environment
 * */
export const createEnvironment = async (
  data: Environment
): Promise<BaseServiceResponse<Environment>> => {
  try {
    const environment = await db.environment.create({
      data,
    });

    return {
      data: environment,
      message: "Environment created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Environment not created",
      success: false,
    };
  }
};

/**
 * @description - Update an environment
 * @param id - The environment ID
 * @param data - The environment data
 * @returns - The updated environment
 * */
export const updateEnvironment = async (
  id: string,
  data: Environment
): Promise<BaseServiceResponse<Environment>> => {
  try {
    const environment = await db.environment.update({
      where: {
        id,
      },
      data,
    });

    return {
      data: environment,
      message: "Environment updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Environment not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an environment
 * @param id - The environment ID
 * @returns - The deleted environment
 * */
export const deleteEnvironment = async (
  id: string
): Promise<BaseServiceResponse<Environment>> => {
  try {
    const environment = await db.environment.delete({
      where: {
        id,
      },
    });

    return {
      data: environment,
      message: "Environment deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Environment not deleted",
      success: false,
    };
  }
};
