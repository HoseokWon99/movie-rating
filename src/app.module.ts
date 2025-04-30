import { Module } from "@nestjs/common";
import { MoviesModule } from './movies/movies.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CommentsModule } from './comments/comments.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import process from "node:process";
import { config } from "dotenv";
import { join } from "path";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UsersDangerModule } from "./users/danger";
import { AuthModule } from "./auth";
import { UsersVerificationModule } from "./users/verification";
import { RedisModule } from "./config/redis";

config({ path: join(__dirname, "..", ".env") });

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: process.env.DB_TYPE as any,
          host: process.env.DB_HOST,
          port: Number(process.env.DBL_PORT!),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: [__dirname + '/**/*.model{.ts,.js}'],
          subscribers: [__dirname + '/**/*.subscriber{.ts,.js}'],
          synchronize: true,
      }),
      EventEmitterModule.forRoot({}),
      RedisModule.forRoot({
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
      }),
      AuthModule,
      UsersVerificationModule,
      UsersDangerModule,
      ProfilesModule,
      MoviesModule,
      ReviewsModule,
      CommentsModule,
  ]
})
export class AppModule {}
