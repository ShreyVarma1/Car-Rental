import {
  ConflictException,
  Injectable,
} from "@nestjs/common";

import { Prisma } from "../../generated/prisma/client";

import { AddOnRepository } from "./addon.repository";

import { CreateAddOnDto } from "./dto/create-addon.dto";
import { UpdateAddOnDto } from "./dto/update-addon.dto";

@Injectable()
export class AddOnService {
  constructor(
    private readonly addOnRepository: AddOnRepository,
  ) {}

  async getAddOns(
    includeInactive = false,
  ) {
    return this.addOnRepository.findAll(
      includeInactive,
    );
  }

  async createAddOn(
    dto: CreateAddOnDto,
  ) {
    try {
      return await this.addOnRepository.create(
        {
          name: dto.name?.trim() ?? "",
          description:
            dto.description?.trim(),
          pricePerDay:
            dto.pricePerDay!,
        },
      );
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "An add-on with this name already exists",
        );
      }

      throw error;
    }
  }

  async updateAddOn(
    id: string,
    dto: UpdateAddOnDto,
  ) {
    await this.addOnRepository
      .findByIdOrThrow(id);

    const data: Prisma.AddOnUpdateInput =
      {};

    if (dto.name !== undefined) {
      data.name = dto.name.trim();
    }

    if (
      dto.description !== undefined
    ) {
      data.description =
        dto.description.trim();
    }

    if (
      dto.pricePerDay !== undefined
    ) {
      data.pricePerDay =
        dto.pricePerDay;
    }

    if (
      dto.isActive !== undefined
    ) {
      data.isActive =
        dto.isActive;
    }

    try {
      return await this.addOnRepository
        .update(id, data);
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictException(
          "An add-on with this name already exists",
        );
      }

      throw error;
    }
  }

  async deleteAddOn(id: string) {
    await this.addOnRepository
      .findByIdOrThrow(id);

    try {
      await this.addOnRepository.delete(
        id,
      );
    } catch (error) {
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError &&
        error.code === "P2003"
      ) {
        throw new ConflictException(
          "Add-on cannot be deleted because it is already used by a booking",
        );
      }

      throw error;
    }

    return {
      message:
        "Add-on deleted successfully",
    };
  }
}