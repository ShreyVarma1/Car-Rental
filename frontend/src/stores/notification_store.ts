import { create } from "zustand";

/**
 * Notification Store
 *
 * Holds the unread notification count so the Header badge and the
 * Notifications page stay in sync without both calling useNotifications().
 *
 * Why Zustand here:
 *   The Header already calls useNotifications() to get the badge count.
 *   The Notifications page does the same. TanStack Query deduplicates the
 *   HTTP call, but both components still re-render whenever the full
 *   notifications list updates. By keeping just the unread count in
 *   Zustand, the Header only re-renders when the number actually changes.
 *
 * Usage pattern:
 *   - NotificationsPage syncs the count into this store after fetching.
 *   - Header reads the count directly from this store — no extra hook call.
 *   - Marking a notification read decrements the count immediately (optimistic).
 *   - Logout resets the count to 0.
 */

interface NotificationStore {
  unreadCount: number;

  /** Set the count (called after fetching notifications) */
  setUnreadCount: (count: number) => void;

  /** Decrement by 1 when a single notification is marked read */
  decrement: () => void;

  /** Reset to 0 when all notifications are marked read or on logout */
  reset: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,

  setUnreadCount: (count) =>
    set({ unreadCount: Math.max(0, count) }),

  decrement: () =>
    set((state) => ({
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  reset: () => set({ unreadCount: 0 }),
}));
