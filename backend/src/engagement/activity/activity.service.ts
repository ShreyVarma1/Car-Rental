import {
  Injectable,
} from "@nestjs/common";

import {
  ActivityAction,
} from "../../../generated/prisma/client";

import {
  ActivityRepository,
} from "./activity.repository";

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepository:
      ActivityRepository,
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
    return this.activityRepository
      .createActivity(data);
  }

  async getAllActivities() {
    return this.activityRepository
      .findAllActivities();
  }

  async getUserActivities(
    userId: string,
  ) {
    return this.activityRepository
      .findActivitiesForUser(
        userId,
      );
  }
}