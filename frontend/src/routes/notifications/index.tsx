"use client";

import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography,} from "@mui/material";

import ProtectedRoute from "@/components/auth/protected_route";

import { useEffect } from "react";

import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "@/hooks/use_notifications";

import { useNotificationStore } from "@/stores/notification_store";

import { Notification } from "@/types/notification";
import { ApiError } from "@/services/api";

function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const markRead = useMarkNotificationRead();
  // Zustand: optimistically decrement the badge in the Header instantly
  const decrement = useNotificationStore((s) => s.decrement);

  return (
    <Card
      variant={notification.isRead ? "outlined" : "elevation"}
      sx={{
        opacity: notification.isRead ? 0.75 : 1,
        borderLeft: notification.isRead ? undefined : "4px solid",
        borderLeftColor: "primary.main",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {notification.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {notification.message}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              {new Date(notification.createdAt).toLocaleString("en-IN")}
            </Typography>
          </Box>

          {!notification.isRead && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                markRead.mutate(notification.id);
                decrement(); // immediately update the Header badge
              }}
              disabled={markRead.isPending}
            >
              Mark read
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function NotificationsPage() {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useNotifications();

  const markAll = useMarkAllNotificationsRead();

  // Zustand: sync unread count into the store whenever data changes
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);
  const resetCount = useNotificationStore((s) => s.reset);

  const unreadCount =
    notifications?.filter((n) => !n.isRead).length ?? 0;

  // Zustand: sync into the store AFTER render, not during — avoids the
  // "setState during render of another component" warning
  useEffect(() => {
    if (notifications) {
      setUnreadCount(unreadCount);
    }
  }, [unreadCount, notifications, setUnreadCount]);

  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mb: 3,
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Notifications
            </Typography>

            {unreadCount > 0 && (
              <Typography color="text.secondary" variant="body2">
                {unreadCount} unread
              </Typography>
            )}
          </Box>

          {unreadCount > 0 && (
            <Button
              variant="outlined"
              onClick={() => {
                markAll.mutate();
                resetCount(); // immediately clear the badge
              }}
              disabled={markAll.isPending}
            >
              Mark all as read
            </Button>
          )}
        </Box>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error instanceof ApiError
              ? error.message
              : "Unable to load notifications."}
          </Alert>
        )}

        {!isLoading && notifications?.length === 0 && (
          <Alert severity="info">You have no notifications.</Alert>
        )}

        <Stack spacing={2}>
          {notifications?.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </Stack>
      </Box>
    </ProtectedRoute>
  );
}
