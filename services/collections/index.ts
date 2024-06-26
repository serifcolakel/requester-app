/**
 * @description - This file is the entry point for the collections service
 */

import { db } from "@/lib/db";
import { CollectionDetailItem } from "@/services/collections/types";
import { BaseServiceResponse } from "@/types";
import type { Collection } from "@prisma/client";
/**
 * @description - Get all collections
 * @returns - All collections
 */
export const getAllCollections = async (): Promise<
  BaseServiceResponse<Collection[]>
> => {
  try {
    const collections = await db.collection.findMany();

    return {
      data: collections,
      message: "Collections retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Collections not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get collections for a user
 * @param userId - The user ID
 * @returns - The user's collections
 */
export const getUserCollections = async (
  userId: string
): Promise<BaseServiceResponse<CollectionDetailItem[]>> => {
  try {
    const collections = await db.collection.findMany({
      where: {
        userId,
      },
    });

    // get requests for each collection
    const collectionRequests = await Promise.all(
      collections.map(async (collection) => {
        const requests = await db.request.findMany({
          where: {
            collectionId: collection.id,
          },
        });

        return {
          ...collection,
          requests,
        };
      })
    );

    const mappedCollections = collections.map((collection) => {
      const requests =
        collectionRequests.find((c) => c.id === collection.id)?.requests || [];

      return {
        ...collection,
        requests,
      };
    });

    return {
      data: mappedCollections,
      message: "Collections retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Collections not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Get a collection by ID
 * @param id - The collection ID
 * @returns - The collection
 */
export const getCollectionById = async (
  id?: string
): Promise<BaseServiceResponse<Collection>> => {
  try {
    if (!id) {
      return {
        data: null,
        message: "Collection not retrieved",
        success: false,
      };
    }

    const collection = await db.collection.findUnique({
      where: {
        id,
      },
    });

    return {
      data: collection,
      message: "Collection retrieved",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Collection not retrieved",
      success: false,
    };
  }
};

/**
 * @description - Create a collection
 * @param data - The collection data
 * @returns - The created collection
 */
export const createCollection = async (data: {
  userId: string;
  name: string;
}): Promise<BaseServiceResponse<Collection>> => {
  try {
    const collection = await db.collection.create({
      data,
    });

    return {
      data: collection,
      message: "Collection created",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Collection not created",
      success: false,
    };
  }
};

/**
 * @description - Update a collection
 * @param id - The collection ID
 * @param data - The collection data
 * @returns - The updated collection
 */
export const putCollection = async (
  id: string,
  data: { name: string; userId: string }
): Promise<BaseServiceResponse<Collection>> => {
  try {
    const collection = await db.collection.update({
      where: {
        id,
        userId: data.userId,
      },
      data,
    });

    return {
      data: collection,
      message: "Collection updated",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Collection not updated",
      success: false,
    };
  }
};

/**
 * @description - Delete a collection
 * @param id - The collection ID
 * @returns - The deleted collection
 */
export const deleteCollection = async (
  id: string
): Promise<BaseServiceResponse<Collection>> => {
  try {
    const collection = await db.collection.delete({
      where: {
        id,
      },
    });

    return {
      data: collection,
      message: "Collection deleted",
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      message: "Collection not deleted",
      success: false,
    };
  }
};
