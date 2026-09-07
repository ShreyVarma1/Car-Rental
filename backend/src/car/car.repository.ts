import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  Prisma,
  BookingStatus,
  CarStatus,
} from "../../generated/prisma/client";

import { PrismaService } from "../prisma/prisma_services";

@Injectable()
export class CarRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(data: Prisma.CarCreateInput) {
    return this.prisma.car.create({
      data,
    });
  }

  async findById(id: string) {
    return this.prisma.car.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findByIdOrThrow(id: string) {
    const car = await this.findById(id);

    if (!car) {
      throw new NotFoundException(
        "Car not found",
      );
    }

    return car;
  }

  async update(
    id: string,
    data: Prisma.CarUpdateInput,
  ) {
    return this.prisma.car.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.car.delete({
      where: {
        id,
      },
    });
  }

  async findUpcomingBookings(carId: string) {
    return this.prisma.booking.findMany({
      where: {
        carId,
        status: BookingStatus.CONFIRMED,
        pickupAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        pickupAt: true,
        dropOffAt: true,
      },
    });
  }

  async findOverlappingBooking(
    carId: string,
    pickupAt: Date,
    dropOffAt: Date,
  ) {
    return this.prisma.booking.findFirst({
      where: {
        carId,
        status:
          BookingStatus.CONFIRMED,
        pickupAt: {
          lt: dropOffAt,
        },
        dropOffAt: {
          gt: pickupAt,
        },
      },
    });
  }

  async search(
    where: Prisma.CarWhereInput,
    skip: number,
    take: number,
    orderBy: Prisma.CarOrderByWithRelationInput,
  ) {
    const [cars, total] =
      await this.prisma.$transaction([
        this.prisma.car.findMany({
          where,
          skip,
          take,
          orderBy,
          include: {
            owner: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        }),

        this.prisma.car.count({
          where,
        }),
      ]);

    return {
      cars,
      total,
    };
  }

  async approve(id: string) {
    return this.prisma.car.update({
      where: {
        id,
      },
      data: {
        status: CarStatus.APPROVED,
      },
    });
  }

  async reject(id: string) {
    return this.prisma.car.update({
      where: {
        id,
      },
      data: {
        status: CarStatus.REJECTED,
      },
    });
  }

  /*
   * Admin-only query.
   *
   * Unlike public search, this does NOT
   * filter by APPROVED status.
   *
   * Therefore admin can see:
   * PENDING
   * APPROVED
   * REJECTED
   */
  async findAllForAdmin() {
    return this.prisma.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  /*
   * Admin can inspect any car regardless
   * of its current status.
   */
  async findByIdForAdmin(id: string) {
    return this.prisma.car.findUnique({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        bookings: {
          orderBy: {
            pickupAt: "desc",
          },
          select: {
            id: true,
            referenceNumber: true,
            renterId: true,
            pickupAt: true,
            dropOffAt: true,
            days: true,
            totalAmount: true,
            status: true,
          },
        },
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            renterId: true,
            rating: true,
            comment: true,
            createdAt: true,
          },
        },
      },
    });
  }
  async findOwnerCars(
  ownerId: string,
) {
  return this.prisma.car.findMany({
    where: {
      ownerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      owner: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
}