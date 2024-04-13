/**
 * @description - The file is the entry point for the Requests service
 */

import { db } from "@/lib/db";
import { createAuthorization } from "@/services/authorization";
import { CreateRequest, UpdateRequest } from "@/services/requests/types";
import { BaseServiceResponse } from "@/types";
import type { Request } from "@prisma/client";
/**
 * @description - Get all Requests
 * @returns - All Requests
 */
export const getAllRequests = async (): Promise<
  BaseServiceResponse<Request[]>
> => {
  try {
    const data = await db.request.findMany();

    return {
      data,
      message: "Requests retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Requests not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Requests for a collectionId
 * @param collectionId - The collectionId ID
 * @returns - The user's collectionId Requests
 *
 * */
export const getCollectionRequests = async (
  collectionId: string
): Promise<BaseServiceResponse<Request[]>> => {
  try {
    const data = await db.request.findMany({
      where: {
        collectionId,
      },
    });

    return {
      data,
      message: "Requests retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Requests not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Request by ID
 * @param id - The Request ID
 * @returns - The Request
 * */
export const getRequest = async (
  id?: string
): Promise<BaseServiceResponse<Request>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "Request not retrieved",
        success: false,
      };
    }

    const data = await db.request.findUnique({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Request retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Request not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Request
 * @param data - The Request data
 * @returns - The created Request
 * */
export const createRequest = async (
  data: CreateRequest
): Promise<BaseServiceResponse<Request>> => {
  try {
    const newRequest = await db.request.create({
      data,
    });

    // create a request authorizations
    const createdAuth = await createAuthorization(
      "BEARER",
      "Bearer Token",
      newRequest.id
    );

    return {
      data: newRequest,
      message: "Request created",
      success: true,
      details: JSON.stringify(createdAuth),
    };
  } catch (error) {
    return {
      data: null,
      message: "Request not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Request
 * @param id - The Request ID
 * @param data - The Request data
 * @returns - The updated Request
 * */
export const putRequest = async ({
  id,
  collectionId,
  ...data
}: UpdateRequest): Promise<BaseServiceResponse<Request>> => {
  try {
    const updateRequest = await db.request.update({
      where: {
        id,
        collectionId,
      },
      data,
    });

    return {
      data: updateRequest,
      message: "Request updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Request not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Request
 * @param id - The Request ID
 * @returns - The deleted Request
 * */
export const removeRequest = async (
  id: string
): Promise<BaseServiceResponse<Request>> => {
  try {
    const deletedRequest = await db.request.delete({
      where: {
        id,
      },
    });

    return {
      data: deletedRequest,
      message: "Request deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Request not deleted",
      success: false,
    };
  }
};
