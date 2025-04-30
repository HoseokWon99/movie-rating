import { Module } from "@nestjs/common";
import { UsersVerificationService } from "./users.verification.service";
import { UsersVerificationController } from "./users.verification.controller";
import { MailClient, MailModule } from "../../config/mail";
import { UsersService } from "../users.service";
import { UsersModule } from "../users.module";
import Redis from "ioredis";
import { User } from "../user.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    MailModule,
  ],
  controllers: [UsersVerificationController],
  providers: [UsersVerificationService, MailClient, UsersService, Redis],
})
export class UsersVerificationModule {}