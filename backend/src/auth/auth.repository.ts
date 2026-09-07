import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma_services";

import {
  User,
  BookingStatus,
  UserRole,
} from "../../generated/prisma/client";

@Injectable()
export class AuthRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findUserByEmail(
    email: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    drivingLicense?: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findUserById(
    id: string,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  // --------------------------------------------------
  // Admin user management
  // --------------------------------------------------

  async findAllUsers() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        drivingLicense: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findUserForAdmin(
    id: string,
  ) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        drivingLicense: true,
        role: true,
        createdAt: true,
        updatedAt: true,

        cars: {
          orderBy: {
            createdAt: "desc",
          },

          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            type: true,
            city: true,
            pricePerDay: true,
            status: true,
            createdAt: true,
          },
        },

        bookings: {
          orderBy: {
            createdAt: "desc",
          },

          select: {
            id: true,
            referenceNumber: true,
            carId: true,
            pickupAt: true,
            dropOffAt: true,
            days: true,
            totalAmount: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async updateUserRole(
    id: string,
    role: UserRole,
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },

      data: {
        role,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        drivingLicense: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deactivateUser(
  id: string,
) {
  return this.prisma.$transaction(
    async (transaction) => {
      const user =
        await transaction.user.update({
          where: {
            id,
          },
          data: {
            isActive: false,
          },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
          },
        });

      await transaction.refreshSession.updateMany(
        {
          where: {
            userId: id,
            revokedAt: null,
          },
          data: {
            revokedAt: new Date(),
          },
        },
      );

      return user;
    },
  );
}
  // --------------------------------------------------
  // Refresh token/session management
  // --------------------------------------------------

  async createRefreshSession(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return this.prisma.refreshSession.create({
      data,
    });
  }

  async findRefreshSession(
    tokenHash: string,
  ) {
    return this.prisma.refreshSession.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  async revokeRefreshSession(
    id: string,
  ) {
    return this.prisma.refreshSession.update({
      where: {
        id,
      },

      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeAllRefreshSessions(
    userId: string,
  ) {
    return this.prisma.refreshSession.updateMany({
      where: {
        userId,
        revokedAt: null,
      },

      data: {
        revokedAt: new Date(),
      },
    });
  }

  async rotateRefreshSession(data: {
    sessionId: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) {
    return this.prisma.$transaction(
      async (transaction) => {
        const revoked =
          await transaction.refreshSession.updateMany(
            {
              where: {
                id: data.sessionId,
                revokedAt: null,
              },

              data: {
                revokedAt: new Date(),
              },
            },
          );

        if (revoked.count !== 1) {
          return null;
        }

        return transaction.refreshSession.create({
          data: {
            userId: data.userId,
            tokenHash: data.tokenHash,
            expiresAt: data.expiresAt,
          },
        });
      },
    );
  }
  async hasActiveOrUpcomingBookings(
  userId: string,
): Promise<boolean> {
  const booking =
    await this.prisma.booking.findFirst({
      where: {
        OR: [
          {
            renterId: userId,
            status: BookingStatus.CONFIRMED,
            dropOffAt: {
              gte: new Date(),
            },
          },
          {
            car: {
              ownerId: userId,
            },
            status: BookingStatus.CONFIRMED,
            dropOffAt: {
              gte: new Date(),
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });
    return Boolean(booking);}}