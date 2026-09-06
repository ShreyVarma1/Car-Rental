import { Injectable } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma_services";
import { User } from "../../generated/prisma/client";

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
}