import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { Prisma } from "../../generated/prisma/client";

import { PrismaService } from "../prisma/prisma_services";

@Injectable()
export class AddOnRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(includeInactive = false) {
    return this.prisma.addOn.findMany({
      where: includeInactive
        ? undefined
        : {
            isActive: true,
          },

      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: string) {
    return this.prisma.addOn.findUnique({
      where: {
        id,
      },
    });
  }

  async findByIdOrThrow(id: string) {
    const addOn =
      await this.findById(id);

    if (!addOn) {
      throw new NotFoundException(
        "Add-on not found",
      );
    }

    return addOn;
  }

  async create(
    data: Prisma.AddOnCreateInput,
  ) {
    return this.prisma.addOn.create({
      data,
    });
  }

  async update(
    id: string,
    data: Prisma.AddOnUpdateInput,
  ) {
    return this.prisma.addOn.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.addOn.delete({
      where: {
        id,
      },
    });
  }
}