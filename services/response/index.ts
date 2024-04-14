"use server";

export async function fetcher(
  url: string | URL | Request,
  options?: RequestInit
) {
  try {
    const res = await fetch(url, options);

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
      message: JSON.stringify(error),
      success: false,
    };
  }
}
