import {
  Injectable,
} from "@nestjs/common";

import {
  PrismaService,
} from "../../prisma/prisma_services";

@Injectable()
export class NotificationRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createNotification(
    data: {
      userId: string;
      title: string;
      message: string;
    },
  ) {
    return this.prisma.notification.create({
      data,
    });
  }

  async findUserNotifications(
    userId: string,
  ) {
    return this.prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async markAsRead(
    notificationId: string,
    userId: string,
  ) {
    return this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },

      data: {
        isRead: true,
      },
    });
  }

  async markAllAsRead(
    userId: string,
  ) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },

      data: {
        isRead: true,
      },
    });
  }
}