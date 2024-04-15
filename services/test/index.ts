/**
 * @description - The file is the entry point for the Test service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Test } from "@prisma/client";

/**
 * @description - Get all Test
 * @returns - All Test
 */
export const getAllTest = async (): Promise<BaseServiceResponse<Test[]>> => {
  try {
    const data = await db.test.findMany();

    return {
      data,
      message: "Test retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Test not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Test for a user
 * @param requestId - The requestId ID
 * @returns - The user's requestId Test
 *
 * */
export const getRequestTestById = async (
  requestId: string
): Promise<BaseServiceResponse<Test>> => {
  try {
    const data = await db.test.findFirst({
      where: {
        requestId,
      },
    });

    return {
      data,
      message: "Test retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Test not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Param by ID
 * @param id - The Param ID
 * @returns - The Param
 * */
export const getTestDetail = async (
  id?: string
): Promise<BaseServiceResponse<Test>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "id is required",
        success: false,
      };
    }

    const data = await db.test.findUnique({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Test retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Test not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Param
 * @param data - The Param data
 * @returns - The created Param
 * */
export const createTest = async (
  newTest: Pick<Test, "script" | "requestId">
): Promise<BaseServiceResponse<Test>> => {
  try {
    const data = await db.test.create({
      data: newTest,
    });

    return {
      data,
      message: "Test created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Test not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Test
 * @param id - The Test ID
 * @param data - The Test data
 * @returns - The updated Test
 * */
export const putTest = async ({
  script,
  id,
  requestId,
}: Pick<Test, "script" | "requestId" | "id">): Promise<
  BaseServiceResponse<Test>
> => {
  try {
    const data = await db.test.update({
      where: {
        id,
        requestId,
      },
      data: {
        script,
      },
    });

    return {
      data,
      message: "Test updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Test not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Test
 * @param id - The Test ID
 * @returns - The deleted Test
 * */
export const removeTest = async (
  id: string
): Promise<BaseServiceResponse<Test>> => {
  try {
    const data = await db.test.delete({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Test deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Test not deleted",
      success: false,
    };
  }
};
