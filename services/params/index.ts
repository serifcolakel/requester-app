/**
 * @description - The file is the entry point for the Params service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Params } from "@prisma/client";

/**
 * @description - Get all Params
 * @returns - All Params
 */
export const getAllParams = async (): Promise<
  BaseServiceResponse<Params[]>
> => {
  try {
    const Params = await db.params.findMany();

    return {
      data: Params,
      message: "Params retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Params not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Params for a user
 * @param requestId - The requestId ID
 * @returns - The user's requestId Params
 *
 * */
export const getRequestParamsById = async (
  requestId: string
): Promise<BaseServiceResponse<Params[]>> => {
  try {
    const data = await db.params.findMany({
      where: {
        requestId,
      },
    });

    return {
      data,
      message: "Params retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Params not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Param by ID
 * @param id - The Param ID
 * @returns - The Param
 * */
export const getParamsDetail = async (
  id?: string
): Promise<BaseServiceResponse<Params>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "Param not retrieved",
        success: false,
      };
    }

    const data = await db.params.findUnique({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Param retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Param not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Param
 * @param data - The Param data
 * @returns - The created Param
 * */
export const createParams = async (
  params: Pick<Params, "key" | "value" | "requestId">
): Promise<BaseServiceResponse<Params>> => {
  try {
    const data = await db.params.create({
      data: params,
    });

    return {
      data,
      message: "Param created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Param not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Param
 * @param id - The Param ID
 * @param data - The Param data
 * @returns - The updated Param
 * */
export const putParams = async ({
  key,
  value,
  requestId,
  id,
}: Pick<Params, "key" | "value" | "requestId" | "id">): Promise<
  BaseServiceResponse<Params>
> => {
  try {
    const Param = await db.params.update({
      where: {
        id,
        requestId,
      },
      data: {
        key,
        value,
      },
    });

    return {
      data: Param,
      message: "Param updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Param not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Param
 * @param id - The Param ID
 * @returns - The deleted Param
 * */
export const removeParams = async (
  id: string
): Promise<BaseServiceResponse<Params>> => {
  try {
    const Param = await db.params.delete({
      where: {
        id,
      },
    });

    return {
      data: Param,
      message: "Param deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Param not deleted",
      success: false,
    };
  }
};
