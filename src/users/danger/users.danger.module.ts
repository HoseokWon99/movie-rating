import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user.model";
import { AuthModule } from "../../auth";
import { UsersService } from "../users.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { AUTH_GUARDS } from "../../auth";
import { UsersDangerController } from "./users.danger.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    AuthModule
  ],
  controllers: [UsersDangerController],
  providers: [
    UsersService,
    JwtService,
    ...AUTH_GUARDS
  ]
})
export class UsersDangerModule {}