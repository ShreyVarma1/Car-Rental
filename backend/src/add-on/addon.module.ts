import { Module } from "@nestjs/common";

import { AddOnController } from "./addon.controller";
import { AddOnService } from "./addon.services";
import { AddOnRepository } from "./addon.repository";

@Module({
  controllers: [
    AddOnController,
  ],

  providers: [
    AddOnService,
    AddOnRepository,
  ],
})
export class AddOnModule {}