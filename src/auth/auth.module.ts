import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users";
import { UsersModule } from "../users";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersService } from "../users";
import { AUTH_GUARDS } from "./guards";
import { JwtModule, JwtService } from "@nestjs/jwt";
import Redis from "ioredis";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [UsersService, JwtService, ...AUTH_GUARDS, AuthService, Redis],
  exports: [UsersService, ...AUTH_GUARDS],
})
export class AuthModule {}