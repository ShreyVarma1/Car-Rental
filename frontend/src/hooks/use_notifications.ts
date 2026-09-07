"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "@/services/notification_services";

import { useAuth } from "@/hooks/use_auth";

export function useNotifications() {
  const { accessToken, refreshAccessToken } = useAuth();

  return useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      getNotifications(accessToken!, refreshAccessToken),
    enabled: Boolean(accessToken),
  });
}

export function useMarkNotificationRead() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      markNotificationRead(id, accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const { accessToken, refreshAccessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      markAllNotificationsRead(accessToken!, refreshAccessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
