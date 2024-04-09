"use server";

import { db } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { Prisma } from "@prisma/client";
/**
 * @description - Get the current user
 * @returns - The current user
 */
export async function getUser() {
  try {
    const supabase = createClient();

    const user = await supabase.auth.getUser();

    return user.data.user;
  } catch (error) {
    return null;
  }
}

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    const user = await db.user.create({
      data,
    });

    return user;
  } catch (error) {
    window.console.log(error);
    throw new Error(JSON.stringify(error));
  }
}
