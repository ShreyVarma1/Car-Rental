import { authenticatedRequest } from "./authenticated_api";

import { Notification } from "@/types/notification";

export function getNotifications(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Notification[]>("/notifications", {
    accessToken,
    refreshAccessToken,
  });
}

export function markNotificationRead(
  id: string,
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<Notification>(`/notifications/${id}/read`, {
    method: "PATCH",
    accessToken,
    refreshAccessToken,
  });
}

export function markAllNotificationsRead(
  accessToken: string,
  refreshAccessToken: () => Promise<string>,
) {
  return authenticatedRequest<{ message: string }>("/notifications/read-all", {
    method: "PATCH",
    accessToken,
    refreshAccessToken,
  });
}
