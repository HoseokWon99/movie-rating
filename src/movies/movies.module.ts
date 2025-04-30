import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TMDBClient, TMDBModule } from "../config/tmdb";
import { Review } from "../reviews/review.model";
import { MoviesViewController } from "./movies.view.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewsModule } from "../reviews/reviews.module";
import { ReviewsService } from "../reviews/reviews.service";

@Module({
  controllers: [MoviesController, MoviesViewController],
  providers: [MoviesService, TMDBClient,  ReviewsService],
  imports: [TypeOrmModule.forFeature([Review]), TMDBModule, ReviewsModule]
})
export class MoviesModule {}
