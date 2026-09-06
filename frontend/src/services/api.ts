const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not configured",
  );
}

export class ApiError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number,
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      credentials: "include",

      headers: {
        "Content-Type":
          "application/json",

        ...options?.headers,
      },
    },
  );

  if (!response.ok) {
    const error =
      await response
        .json()
        .catch(() => null);

    const message =
      Array.isArray(error?.message)
        ? error.message.join(", ")
        : error?.message ||
          "Something went wrong with the API request";

    throw new ApiError(
      message,
      response.status,
    );
  }

  return response.json();
}