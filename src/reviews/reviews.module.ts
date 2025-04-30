import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from "./review.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, UsersService } from "../users";
import { AUTH_GUARDS, AuthModule } from "../auth";
import { JwtModule, JwtService } from "@nestjs/jwt";
import Redis from "ioredis";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Review]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    AuthModule
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService, UsersService, JwtService, Redis, ...AUTH_GUARDS],
  exports: [ReviewsService]
})
export class ReviewsModule {}
