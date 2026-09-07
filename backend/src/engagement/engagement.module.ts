import {Module,} from "@nestjs/common";
import {ReviewController,} from "./review/review.controller";
import {ReviewService,} from "./review/review.service";
import {ReviewRepository,} from "./review/review.repository";
import {NotificationController,} from "./notification/notification.controller";
import {NotificationService,} from "./notification/notification.service";
import {NotificationRepository,} from "./notification/notification.repository";
import {ActivityController,} from "./activity/activity.controller";
import {ActivityService,} from "./activity/activity.service";
import {ActivityRepository,} from "./activity/activity.repository";

@Module({
  controllers: [
    ReviewController,
    NotificationController,
    ActivityController,
  ],

  providers: [
    ReviewService,
    ReviewRepository,

    NotificationService,
    NotificationRepository,

    ActivityService,
    ActivityRepository,
  ],

  exports: [
    ReviewService,
    NotificationService,
    ActivityService,
  ],
})
export class EngagementModule {}