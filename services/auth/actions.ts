"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();

  const { error, data: response } =
    await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }

  return {
    success: true,
    message: "Logged in",
    data: response,
  };
}

export async function register(data: {
  email: string;
  password: string;
  fullName: string;
}) {
  const supabase = createClient();

  const { error, data: response } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        fullName: data.fullName,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }

  return {
    success: true,
    message: "Registered",
    data: response,
  };
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }

  return {
    success: true,
    message: "Logged out",
    data: null,
  };
}
