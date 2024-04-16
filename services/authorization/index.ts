"use server";

/**
 * @description - The file is the entry point for the Authorizations service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Auth, AuthType } from "@prisma/client";
/**
 * @description - Get all Authorizations
 * @returns - All Authorizations
 */
export const getAllAuthorizations = async (): Promise<
  BaseServiceResponse<Auth[]>
> => {
  try {
    const Authorizations = await db.auth.findMany();

    return {
      data: Authorizations,
      message: "Authorizations retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Authorizations not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Authorizations for a user
 * @param requestId - The requestId ID
 * @returns - The user's requestId Authorizations
 *
 * */
export const getAuthorizations = async (
  requestId: string
): Promise<BaseServiceResponse<Auth>> => {
  try {
    const Authorizations = await db.auth.findFirst({
      where: {
        requestId,
      },
    });

    return {
      data: Authorizations,
      message: "Authorizations retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Authorizations not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Authorization by ID
 * @param id - The Authorization ID
 * @returns - The Authorization
 * */
export const getAuthorization = async (
  id?: string
): Promise<BaseServiceResponse<Auth>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "Authorization not retrieved",
        success: false,
      };
    }

    const Authorization = await db.auth.findUnique({
      where: {
        id,
      },
    });

    return {
      data: Authorization,
      message: "Authorization retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Authorization not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Authorization
 * @param data - The Authorization data
 * @returns - The created Authorization
 * */
export const createAuthorization = async (
  type: AuthType,
  token: string,
  requestId: string
): Promise<BaseServiceResponse<Auth>> => {
  try {
    const Authorization = await db.auth.create({
      data: {
        token,
        type,
        requestId,
      },
    });

    return {
      data: Authorization,
      message: "Authorization created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Authorization not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Authorization
 * @param id - The Authorization ID
 * @param data - The Authorization data
 * @returns - The updated Authorization
 * */
export const putAuthorization = async (
  id: string,
  type: AuthType,
  token: string,
  requestId: string
): Promise<BaseServiceResponse<Auth>> => {
  try {
    const Authorization = await db.auth.update({
      where: {
        id,
        requestId,
      },
      data: {
        token,
        type,
      },
    });

    return {
      data: Authorization,
      message: "Authorization updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Authorization not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Authorization
 * @param id - The Authorization ID
 * @returns - The deleted Authorization
 * */
export const removeAuthorization = async (
  id: string
): Promise<BaseServiceResponse<Auth>> => {
  try {
    const Authorization = await db.auth.delete({
      where: {
        id,
      },
    });

    return {
      data: Authorization,
      message: "Authorization deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Authorization not deleted",
      success: false,
    };
  }
};
