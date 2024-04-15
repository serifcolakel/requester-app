/**
 * @description - The file is the entry point for the Body service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Body } from "@prisma/client";

/**
 * @description - Get all Body
 * @returns - All Body
 */
export const getAllBody = async (): Promise<BaseServiceResponse<Body[]>> => {
  try {
    const data = await db.body.findMany();

    return {
      data,
      message: "Body retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Body not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Body for a user
 * @param requestId - The requestId ID
 * @returns - The user's requestId Body
 *
 * */
export const getRequestBodyById = async (
  requestId: string
): Promise<BaseServiceResponse<Body>> => {
  try {
    const data = await db.body.findFirst({
      where: {
        requestId,
      },
    });

    return {
      data,
      message: "Body retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Body not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Param by ID
 * @param id - The Param ID
 * @returns - The Param
 * */
export const getBodyDetail = async (
  id?: string
): Promise<BaseServiceResponse<Body>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "id is required",
        success: false,
      };
    }

    const data = await db.body.findUnique({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Body retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Body not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Param
 * @param data - The Param data
 * @returns - The created Param
 * */
export const createBody = async (
  newBody: Pick<Body, "content" | "requestId" | "type">
): Promise<BaseServiceResponse<Body>> => {
  try {
    const data = await db.body.create({
      data: newBody,
    });

    return {
      data,
      message: "Body created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Body not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Body
 * @param id - The Body ID
 * @param data - The Body data
 * @returns - The updated Body
 * */
export const putBody = async ({
  content,
  type,
  id,
  requestId,
}: Pick<Body, "content" | "requestId" | "type" | "id">): Promise<
  BaseServiceResponse<Body>
> => {
  try {
    const data = await db.body.update({
      where: {
        id,
        requestId,
      },
      data: {
        type,
        content,
      },
    });

    return {
      data,
      message: "Body updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Body not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Body
 * @param id - The Body ID
 * @returns - The deleted Body
 * */
export const removeBody = async (
  id: string
): Promise<BaseServiceResponse<Body>> => {
  try {
    const data = await db.body.delete({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Body deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Body not deleted",
      success: false,
    };
  }
};
