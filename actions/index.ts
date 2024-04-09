/* eslint-disable no-console */
import { db } from "@/lib/db";
import { getUser } from "@/services/auth";

export async function seed() {
  try {
    const currentUser = await getUser();

    if (!currentUser) {
      return;
    }

    const { id: userId } = currentUser;

    const collection = await db.collection.create({
      data: {
        userId,
        name: "User 1",
      },
    });

    const request = await db.request.create({
      data: {
        name: "Request 1",
        collectionId: collection.id,
        body: "Body 1",
        method: "GET",
        url: "https://jsonplaceholder.typicode.com/posts/1",
      },
    });

    // const environment = await db.environment.create({
    //   data: {
    //     name: "Environment 1",
    //     userId,
    //   },
    // });

    // await db.variable.create({
    //   data: {
    //     name: "Variable 1",
    //     value: "Value 1",
    //     environmentId: environment.id,
    //   },
    // });

    // headers
    await db.header.create({
      data: {
        key: "Content-Type",
        value: "application/json",
        requestId: request.id,
      },
    });

    // query params
    await db.params.create({
      data: {
        key: "postId",
        value: "1",
        requestId: request.id,
      },
    });

    console.log("Seeded data");
  } catch (error) {
    console.error(error);
  }
}
