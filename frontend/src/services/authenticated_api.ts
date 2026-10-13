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
    return await makeRequest(accessToken);
  } catch (error) {
    if (
      !(error instanceof ApiError) ||
      error.statusCode !== 401
    ) {
      throw error;
    }

    /*
     * Token expired — refresh once and retry.
     * If the refresh itself fails (expired/revoked refresh token),
     * refreshAccessToken() will throw and we propagate that error
     * directly without another retry, preventing an infinite loop.
     */
    const newAccessToken = await refreshAccessToken();
    return makeRequest(newAccessToken);
  }
}