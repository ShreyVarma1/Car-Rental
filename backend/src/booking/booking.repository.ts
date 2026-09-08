import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import {
  BookingStatus,
  Prisma,
} from "../../generated/prisma/client";

import { PrismaService } from "../prisma/prisma_services";

@Injectable()
export class BookingRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findCarForBooking(
    carId: string,
  ) {
    return this.prisma.car.findUnique({
      where: {
        id: carId,
      },
    });
  }

  async findActiveAddOns(
    ids: string[],
  ) {
    return this.prisma.addOn.findMany({
      where: {
        id: {
          in: ids,
        },
        isActive: true,
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

  async createBooking(
    data: Prisma.BookingCreateInput,
  ) {
    return this.prisma.booking.create({
      data,
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            city: true,
          },
        },

        bookingAddOns: {
          include: {
            addOn: true,
          },
        },
      },
    });
  }

  async findById(id: string) {
    return this.prisma.booking.findUnique({
      where: {
        id,
      },

      include: {
        car: {
          select: {
            id: true,
            ownerId: true,
            make: true,
            model: true,
            city: true,
          },
        },

        renter: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        bookingAddOns: {
          include: {
            addOn: true,
          },
        },

        review: true,
      },
    });
  }

  async findByIdOrThrow(id: string) {
    const booking =
      await this.findById(id);

    if (!booking) {
      throw new NotFoundException(
        "Booking not found",
      );
    }

    return booking;
  }

  async findUserBookings(
    renterId: string,
  ) {
    return this.prisma.booking.findMany({
      where: {
        renterId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            city: true,
          },
        },

        bookingAddOns: {
          include: {
            addOn: true,
          },
        },
      },
    });
  }

  async cancelBooking(
    id: string,
  ) {
    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        status:
          BookingStatus.CANCELLED,
      },
    });
  }

  /**
   * Creates a booking inside a transaction and
   * takes a PostgreSQL advisory transaction lock
   * for the specific car.
   *
   * This prevents two simultaneous booking
   * requests for the same car from both passing
   * the availability check.
   */
  async createBookingWithLock(
    carId: string,
    data: Prisma.BookingCreateInput,
    pickupAt: Date,
    dropOffAt: Date,
  ) {
    return this.prisma.$transaction(
      async (transaction) => {
        await transaction.$executeRaw`
          SELECT pg_advisory_xact_lock(
            hashtextextended(${carId}, 0)
          )
        `;

        const overlappingBooking =
          await transaction.booking.findFirst({
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

        if (overlappingBooking) {
          return null;
        }

        return transaction.booking.create({
          data,

          include: {
            car: {
              select: {
                id: true,
                make: true,
                model: true,
                city: true,
              },
            },

            bookingAddOns: {
              include: {
                addOn: true,
              },
            },
          },
        });
      },
    );
  }
async findOwnerBookings(
  ownerId: string,
) {
  return this.prisma.booking.findMany({
    where: {
      car: {
        ownerId,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      car: {
        select: {
          id: true,
          make: true,
          model: true,
          city: true,
          pricePerDay: true,
        },
      },

      renter: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      bookingAddOns: {
        include: {
          addOn: true,
        },
      },
    },
  });
}

async findOwnerBookingById(
  bookingId: string,
  ownerId: string,
) {
  return this.prisma.booking.findFirst({
    where: {
      id: bookingId,

      car: {
        ownerId,
      },
    },

    include: {
      car: {
        select: {
          id: true,
          ownerId: true,
          make: true,
          model: true,
          city: true,
          pricePerDay: true,
        },
      },

      renter: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      bookingAddOns: {
        include: {
          addOn: true,
        },
      },

      review: true,
    },
  });
}
async findAllForAdmin() {
  return this.prisma.booking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      car: {
        select: {
          id: true,
          make: true,
          model: true,
          city: true,
          pricePerDay: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      renter: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      bookingAddOns: {
        include: {
          addOn: true,
        },
      },
    },
  });
}
async cancelBookingByAdmin(
  bookingId: string,
) {
  return this.prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: BookingStatus.CANCELLED,
    },
  });
}

/**
 * Finds every CONFIRMED booking whose drop-off
 * time has already passed. These are candidates
 * to be marked COMPLETED by the scheduled job.
 */
async findBookingsPendingCompletion() {
  return this.prisma.booking.findMany({
    where: {
      status: BookingStatus.CONFIRMED,

      dropOffAt: {
        lte: new Date(),
      },
    },

    select: {
      id: true,
      referenceNumber: true,
      renterId: true,

      car: {
        select: {
          ownerId: true,
          make: true,
          model: true,
        },
      },
    },
  });
}

/**
 * Bulk-transitions a batch of bookings to
 * COMPLETED. Re-checks status = CONFIRMED so a
 * booking cancelled between the read and this
 * write is never overwritten.
 */
async markBookingsCompleted(
  ids: string[],
) {
  return this.prisma.booking.updateMany({
    where: {
      id: {
        in: ids,
      },

      status: BookingStatus.CONFIRMED,
    },

    data: {
      status: BookingStatus.COMPLETED,
    },
  });
}

/**
 * All revenue-bearing bookings for cars owned by a
 * given owner. Used to build the owner dashboard
 * (revenue and utilisation per car).
 */
async findOwnerBookingsForDashboard(
  ownerId: string,
) {
  return this.prisma.booking.findMany({
    where: {
      car: {
        ownerId,
      },
      status: {
        in: [
          BookingStatus.CONFIRMED,
          BookingStatus.COMPLETED,
        ],
      },
    },

    select: {
      carId: true,
      totalAmount: true,
      pickupAt: true,

      car: {
        select: {
          make: true,
          model: true,
        },
      },
    },
  });
}}