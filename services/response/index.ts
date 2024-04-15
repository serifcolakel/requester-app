"use server";

import { getErrorMessage } from "@/utils/error.utils";

const ignoredBodyMethods = ["GET", "HEAD"];

export async function fetcher(
  url: string | URL | Request,
  options?: RequestInit
) {
  try {
    const body =
      options?.body && !ignoredBodyMethods.includes(options.method || "")
        ? options.body
        : undefined;

    const res = await fetch(url, {
      ...options,
      body,
    });

    return {
      data: await res.json(),
      status: res.status,
      statusText: res.statusText,
      parsedHeaders: Object.fromEntries(res.headers),
      success: res.ok,
    };
  } catch (error) {
    return {
      data: JSON.stringify(error),
      status: 500,
      statusText: getErrorMessage(error, "Failed to fetch"),
      parsedHeaders: {},
      success: false,
    };
  }
}
