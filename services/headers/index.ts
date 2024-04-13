/**
 * @description - The file is the entry point for the Header service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Header } from "@prisma/client";

/**
 * @description - Get all Header
 * @returns - All Header
 */
export const getAllHeader = async (): Promise<
  BaseServiceResponse<Header[]>
> => {
  try {
    const Header = await db.header.findMany();

    return {
      data: Header,
      message: "Header retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Header not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Header for a user
 * @param requestId - The requestId ID
 * @returns - The user's requestId Header
 *
 * */
export const getRequestHeaderById = async (
  requestId: string
): Promise<BaseServiceResponse<Header[]>> => {
  try {
    const data = await db.header.findMany({
      where: {
        requestId,
      },
    });

    return {
      data,
      message: "Header retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Header not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Header by ID
 * @param id - The Header ID
 * @returns - The Header
 * */
export const getHeaderDetail = async (
  id?: string
): Promise<BaseServiceResponse<Header>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "Header not retrieved",
        success: false,
      };
    }

    const data = await db.header.findUnique({
      where: {
        id,
      },
    });

    return {
      data,
      message: "Header retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Header not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Header
 * @param data - The Header data
 * @returns - The created Header
 * */
export const createHeader = async (
  Header: Pick<Header, "key" | "value" | "requestId">
): Promise<BaseServiceResponse<Header>> => {
  try {
    const data = await db.header.create({
      data: Header,
    });

    return {
      data,
      message: "Header created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Header not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Header
 * @param id - The Header ID
 * @param data - The Header data
 * @returns - The updated Header
 * */
export const putHeader = async ({
  key,
  value,
  requestId,
  id,
}: Pick<Header, "key" | "value" | "requestId" | "id">): Promise<
  BaseServiceResponse<Header>
> => {
  try {
    const Header = await db.header.update({
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
      data: Header,
      message: "Header updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Header not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Header
 * @param id - The Header ID
 * @returns - The deleted Header
 * */
export const removeHeader = async (
  id: string
): Promise<BaseServiceResponse<Header>> => {
  try {
    const Header = await db.header.delete({
      where: {
        id,
      },
    });

    return {
      data: Header,
      message: "Header deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Header not deleted",
      success: false,
    };
  }
};
