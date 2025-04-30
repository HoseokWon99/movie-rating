import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { Review } from "./review.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review])],
  exports: [ReviewsService]
})
export class ReviewsModule {}
