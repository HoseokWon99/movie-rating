import { Module } from '@nestjs/common';
import { User } from "./user.model";
import { UsersViewController } from "./users.view.controller";
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersViewController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
