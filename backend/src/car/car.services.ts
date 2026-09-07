import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";

import {
  ActivityAction,
  CarStatus,
  Prisma,
} from "../../generated/prisma/client";

import { CarRepository } from "./car.repository";

import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { SearchCarsDto } from "./dto/search-car.dto";

import {
  NotificationService,
} from "../engagement/notification/notification.service";

import {
  ActivityService,
} from "../engagement/activity/activity.service";

@Injectable()
export class CarService {
  private readonly logger =
    new Logger(CarService.name);

  constructor(
    private readonly carRepository: CarRepository,

    private readonly notificationService: NotificationService,

    private readonly activityService: ActivityService,
  ) {}

  async createCar(
    ownerId: string,
    dto: CreateCarDto,
  ) {
    const car =
      await this.carRepository.create({
        make: dto.make!.trim(),

        model: dto.model!.trim(),

        year: dto.year!,

        type: dto.type!,

        transmission:
          dto.transmission!,

        fuel: dto.fuel!,

        seats: dto.seats!,

        city: dto.city!.trim(),

        pricePerDay:
          dto.pricePerDay!,

        status:
          CarStatus.PENDING,

        owner: {
          connect: {
            id: ownerId,
          },
        },
      });

    await this.logActivity({
      userId: ownerId,
      action: ActivityAction.CREATE,
      entity: "CAR",
      entityId: car.id,
      details: {
        make: car.make,
        model: car.model,
        city: car.city,
      },
    });

    return car;
  }

  async getCar(id: string) {
    const car =
      await this.carRepository
        .findByIdOrThrow(id);

    /*
     * Public car details should only expose
     * approved listings.
     */
    if (
      car.status !==
      CarStatus.APPROVED
    ) {
      throw new NotFoundException(
        "Car not found",
      );
    }

    return car;
  }

  async updateCar(
    id: string,
    ownerId: string,
    dto: UpdateCarDto,
  ) {
    const car =
      await this.carRepository
        .findByIdOrThrow(id);

    this.ensureOwner(
      car.ownerId,
      ownerId,
    );

    const data:
      Prisma.CarUpdateInput = {};

    if (
      dto.make !== undefined
    ) {
      data.make =
        dto.make.trim();
    }

    if (
      dto.model !== undefined
    ) {
      data.model =
        dto.model.trim();
    }

    if (
      dto.year !== undefined
    ) {
      data.year = dto.year;
    }

    if (
      dto.type !== undefined
    ) {
      data.type = dto.type;
    }

    if (
      dto.transmission !==
      undefined
    ) {
      data.transmission =
        dto.transmission;
    }

    if (
      dto.fuel !== undefined
    ) {
      data.fuel = dto.fuel;
    }

    if (
      dto.seats !== undefined
    ) {
      data.seats = dto.seats;
    }

    if (
      dto.city !== undefined
    ) {
      data.city =
        dto.city.trim();
    }

    if (
      dto.pricePerDay !==
      undefined
    ) {
      data.pricePerDay =
        dto.pricePerDay;
    }

    /*
     * Any owner modification requires
     * admin approval again.
     */
    data.status =
      CarStatus.PENDING;

    const updatedCar =
      await this.carRepository
        .update(
          id,
          data,
        );

    await this.logActivity({
      userId: ownerId,

      action:
        ActivityAction.UPDATE,

      entity: "CAR",

      entityId: id,

      details: {
        statusResetTo:
          CarStatus.PENDING,
      },
    });

    return updatedCar;
  }

  async deleteCar(
    id: string,
    ownerId: string,
  ) {
    const car =
      await this.carRepository
        .findByIdOrThrow(id);

    this.ensureOwner(
      car.ownerId,
      ownerId,
    );

    const upcomingBookings =
      await this.carRepository
        .findUpcomingBookings(
          id,
        );

    if (
      upcomingBookings.length >
      0
    ) {
      throw new ConflictException(
        "Car cannot be deleted because it has upcoming bookings",
      );
    }

    await this.carRepository
      .delete(id);

    await this.logActivity({
      userId: ownerId,

      action:
        ActivityAction.DELETE,

      entity: "CAR",

      entityId: id,

      details: {
        make: car.make,
        model: car.model,
      },
    });

    return {
      message:
        "Car deleted successfully",
    };
  }

  async approveCar(id: string) {
    const car =
      await this.carRepository
        .findByIdOrThrow(id);

    if (
      car.status ===
      CarStatus.APPROVED
    ) {
      throw new ConflictException(
        "Car is already approved",
      );
    }

    const approvedCar =
      await this.carRepository
        .approve(id);

    await this.logActivity({
      action:
        ActivityAction.APPROVE,

      entity: "CAR",

      entityId: id,

      details: {
        ownerId:
          car.ownerId,
      },
    });

    await this.notifyOwner(
      car.ownerId,
      "Car listing approved",
      `Your ${car.make} ${car.model} listing has been approved and is now available for booking.`,
    );

    return approvedCar;
  }

  async rejectCar(id: string) {
    const car =
      await this.carRepository
        .findByIdOrThrow(id);

    if (
      car.status ===
      CarStatus.REJECTED
    ) {
      throw new ConflictException(
        "Car is already rejected",
      );
    }

    const rejectedCar =
      await this.carRepository
        .reject(id);

    await this.logActivity({
      action:
        ActivityAction.REJECT,

      entity: "CAR",

      entityId: id,

      details: {
        ownerId:
          car.ownerId,
      },
    });

    await this.notifyOwner(
      car.ownerId,
      "Car listing rejected",
      `Your ${car.make} ${car.model} listing has been rejected by an administrator.`,
    );

    return rejectedCar;
  }

  async getAdminCars() {
    return this.carRepository
      .findAllForAdmin();
  }

  async getAdminCar(id: string) {
    const car =
      await this.carRepository
        .findByIdForAdmin(id);

    if (!car) {
      throw new NotFoundException(
        "Car not found",
      );
    }

    return car;
  }

  async searchCars(
    dto: SearchCarsDto,
  ) {
    this.validateSearchDates(
      dto,
    );

    this.validateSearchFilters(
      dto,
    );

    const where:
      Prisma.CarWhereInput = {
      status:
        CarStatus.APPROVED,
    };

    if (dto.city) {
      where.city = {
        equals:
          dto.city.trim(),

        mode: "insensitive",
      };
    }

    if (dto.type) {
      where.type =
        dto.type;
    }

    if (dto.transmission) {
      where.transmission =
        dto.transmission;
    }

    if (dto.fuel) {
      where.fuel =
        dto.fuel;
    }

    if (
      dto.seats !== undefined
    ) {
      where.seats = {
        gte: dto.seats,
      };
    }

    if (
      dto.minPrice !==
        undefined ||
      dto.maxPrice !==
        undefined
    ) {
      where.pricePerDay = {
        ...(dto.minPrice !==
          undefined && {
          gte:
            dto.minPrice,
        }),

        ...(dto.maxPrice !==
          undefined && {
          lte:
            dto.maxPrice,
        }),
      };
    }

    if (dto.search) {
      const search =
        dto.search.trim();

      where.OR = [
        {
          make: {
            contains:
              search,

            mode:
              "insensitive",
          },
        },

        {
          model: {
            contains:
              search,

            mode:
              "insensitive",
          },
        },
      ];
    }

    if (
      dto.pickupAt &&
      dto.dropOffAt
    ) {
      const pickupAt =
        new Date(
          dto.pickupAt,
        );

      const dropOffAt =
        new Date(
          dto.dropOffAt,
        );

      where.bookings = {
        none: {
          status:
            "CONFIRMED",

          pickupAt: {
            lt:
              dropOffAt,
          },

          dropOffAt: {
            gt:
              pickupAt,
          },
        },
      };
    }

    const page =
      dto.page ?? 1;

    const limit =
      dto.limit ?? 10;

    const skip =
      (page - 1) * limit;

    const orderBy =
      this.buildOrderBy(dto);

    const result =
      await this.carRepository
        .search(
          where,
          skip,
          limit,
          orderBy,
        );

    return {
      data:
        result.cars,

      pagination: {
        page,

        limit,

        total:
          result.total,

        totalPages:
          Math.ceil(
            result.total /
              limit,
          ),
      },
    };
  }

  async getOwnerCars(
    ownerId: string,
  ) {
    return this.carRepository
      .findOwnerCars(
        ownerId,
      );
  }

  private validateSearchDates(
    dto: SearchCarsDto,
  ) {
    if (
      Boolean(
        dto.pickupAt,
      ) !==
      Boolean(
        dto.dropOffAt,
      )
    ) {
      throw new ConflictException(
        "pickupAt and dropOffAt must be provided together",
      );
    }

    if (
      !dto.pickupAt ||
      !dto.dropOffAt
    ) {
      return;
    }

    const pickupAt =
      new Date(
        dto.pickupAt,
      );

    const dropOffAt =
      new Date(
        dto.dropOffAt,
      );

    if (
      pickupAt.getTime() <=
      Date.now()
    ) {
      throw new ConflictException(
        "Pickup time must be in the future",
      );
    }

    if (
      dropOffAt.getTime() <=
      pickupAt.getTime()
    ) {
      throw new ConflictException(
        "Drop-off time must be after pickup time",
      );
    }
  }

  private validateSearchFilters(
    dto: SearchCarsDto,
  ) {
    if (
      dto.minPrice !==
        undefined &&
      dto.maxPrice !==
        undefined &&
      dto.minPrice >
        dto.maxPrice
    ) {
      throw new ConflictException(
        "minPrice cannot be greater than maxPrice",
      );
    }
  }

  private buildOrderBy(
    dto: SearchCarsDto,
  ): Prisma.CarOrderByWithRelationInput {
    const sortBy =
      dto.sortBy ??
      "createdAt";

    const sortOrder =
      dto.sortOrder ??
      "desc";

    return {
      [sortBy]:
        sortOrder,
    };
  }

  private ensureOwner(
    actualOwnerId: string,
    requestedOwnerId: string,
  ) {
    if (
      actualOwnerId !==
      requestedOwnerId
    ) {
      throw new ForbiddenException(
        "You can only manage your own cars",
      );
    }
  }

  private async logActivity(
    data: {
      userId?: string;
      action: ActivityAction;
      entity: string;
      entityId?: string;
      details?: object;
    },
  ) {
    try {
      await this.activityService
        .createActivity(data);
    } catch (error) {
      this.logger.error(
        "Car activity logging failed",
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }
  }

  private async notifyOwner(
    userId: string,
    title: string,
    message: string,
  ) {
    try {
      await this.notificationService
        .createNotification({
          userId,
          title,
          message,
        });
    } catch (error) {
      this.logger.error(
        "Car notification failed",
        error instanceof Error
          ? error.stack
          : String(error),
      );
    }
  }
}