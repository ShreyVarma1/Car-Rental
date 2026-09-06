import {
  ApiError,
  apiRequest,
} from "./api";

interface AuthenticatedRequestOptions
  extends RequestInit {
  accessToken: string;
  refreshAccessToken: () => Promise<string>;
}

export async function authenticatedRequest<T>(
  endpoint: string,
  options: AuthenticatedRequestOptions,
): Promise<T> {
  const {
    accessToken,
    refreshAccessToken,
    ...requestOptions
  } = options;

  const makeRequest = (
    token: string,
  ) => {
    return apiRequest<T>(
      endpoint,
      {
        ...requestOptions,

        headers: {
          ...requestOptions.headers,

          Authorization:
            `Bearer ${token}`,
        },
      },
    );
  };

  try {
    return await makeRequest(
      accessToken,
    );
  } catch (error) {
    if (
      !(
        error instanceof ApiError
      ) ||
      error.statusCode !== 401
    ) {
      throw error;
    }

    const newAccessToken =
      await refreshAccessToken();

    return makeRequest(
      newAccessToken,
    );
  }
}