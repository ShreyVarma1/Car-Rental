import {
  Injectable,
} from "@nestjs/common";

import {
  ActivityAction,
  Prisma,
} from "../../../generated/prisma/client";

import {
  PrismaService,
} from "../../prisma/prisma_services";

@Injectable()
export class ActivityRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createActivity(
    data: {
      userId?: string;
      action: ActivityAction;
      entity: string;
      entityId?: string;
      details?: object;
    },
  ) {
    return this.prisma.activityLog.create({
      data: {
        userId:
          data.userId,

        action:
          data.action,

        entity:
          data.entity,

        entityId:
          data.entityId,

        details:
          data.details as Prisma.InputJsonValue,
      },
    });
  }

  async findAllActivities() {
    return this.prisma.activityLog.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }

  async findActivitiesForUser(
    userId: string,
  ) {
    return this.prisma.activityLog.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }
}