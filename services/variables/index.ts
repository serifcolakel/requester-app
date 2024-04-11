/**
 * @description - The file is the entry point for the Variables service
 */

import { db } from "@/lib/db";
import { BaseServiceResponse } from "@/types";
import type { Variable } from "@prisma/client";
/**
 * @description - Get all Variables
 * @returns - All Variables
 */
export const getAllVariables = async (): Promise<
  BaseServiceResponse<Variable[]>
> => {
  try {
    const Variables = await db.variable.findMany();

    return {
      data: Variables,
      message: "Variables retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Variables not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get Variables for a user
 * @param environmentId - The environmentId ID
 * @returns - The user's environmentId Variables
 *
 * */
export const getVariables = async (
  environmentId: string
): Promise<BaseServiceResponse<Variable[]>> => {
  try {
    const variables = await db.variable.findMany({
      where: {
        environmentId,
      },
    });

    return {
      data: variables,
      message: "Variables retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Variables not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get an Variable by ID
 * @param id - The Variable ID
 * @returns - The Variable
 * */
export const getVariable = async (
  id?: string
): Promise<BaseServiceResponse<Variable>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "Variable not retrieved",
        success: false,
      };
    }

    const variable = await db.variable.findUnique({
      where: {
        id,
      },
    });

    return {
      data: variable,
      message: "Variable retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Variable not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create an Variable
 * @param data - The Variable data
 * @returns - The created Variable
 * */
export const createVariable = async (
  name: string,
  value: string,
  environmentId: string
): Promise<BaseServiceResponse<Variable>> => {
  try {
    const variable = await db.variable.create({
      data: {
        name,
        environmentId,
        value,
      },
    });

    return {
      data: variable,
      message: "Variable created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Variable not created",
      success: false,
    };
  }
};

/**
 * @description - Update an Variable
 * @param id - The Variable ID
 * @param data - The Variable data
 * @returns - The updated Variable
 * */
export const putVariable = async (
  id: string,
  name: string,
  value: string,
  environmentId: string
): Promise<BaseServiceResponse<Variable>> => {
  try {
    const variable = await db.variable.update({
      where: {
        id,
        environmentId,
      },
      data: {
        name,
        value,
      },
    });

    return {
      data: variable,
      message: "Variable updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Variable not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete an Variable
 * @param id - The Variable ID
 * @returns - The deleted Variable
 * */
export const removeVariable = async (
  id: string
): Promise<BaseServiceResponse<Variable>> => {
  try {
    const Variable = await db.variable.delete({
      where: {
        id,
      },
    });

    return {
      data: Variable,
      message: "Variable deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Variable not deleted",
      success: false,
    };
  }
};
