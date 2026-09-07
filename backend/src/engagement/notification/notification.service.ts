import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  NotificationRepository,
} from "./notification.repository";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository:
      NotificationRepository,
  ) {}

  async createNotification(
    data: {
      userId: string;
      title: string;
      message: string;
    },
  ) {
    return this.notificationRepository
      .createNotification(data);
  }

  async getUserNotifications(
    userId: string,
  ) {
    return this.notificationRepository
      .findUserNotifications(
        userId,
      );
  }

  async markAsRead(
    notificationId: string,
    userId: string,
  ) {
    const result =
      await this.notificationRepository
        .markAsRead(
          notificationId,
          userId,
        );

    if (result.count === 0) {
      throw new NotFoundException(
        "Notification not found",
      );
    }

    return {
      message:
        "Notification marked as read",
    };
  }

  async markAllAsRead(
    userId: string,
  ) {
    const result =
      await this.notificationRepository
        .markAllAsRead(
          userId,
        );

    return {
      message:
        "Notifications marked as read",

      updatedCount:
        result.count,
    };
  }
}