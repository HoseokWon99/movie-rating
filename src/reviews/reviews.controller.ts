import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";
import { UpdateReviewDTO } from "./dto";
import { CreateReviewRequestDTO } from "./dto";
import { AUTH_GUARDS } from "../auth/guards";
import { Response } from "express";
import { OnEvent } from "@nestjs/event-emitter";
import { User } from "../users";

@Controller('api/reviews')
export class ReviewsController {

    constructor(
        @Inject(ReviewsService)
        private readonly _reviewsService: ReviewsService
    ) {}

    @Get("/:movieId")
    async getReviews(
        @Param('movieId') movieId: number
    ) {
        return {
            reviews: await this._reviewsService.getReviewsBy({
                movieId: movieId
            })
        }
    }

    @Post("/")
    @UseGuards(...AUTH_GUARDS)
    async createReview(
      @Body() body: CreateReviewRequestDTO,
      @Res() res: Response
    ) {
      const userId: number = res.locals.userInfo.id;

      res.send(await this._reviewsService.createReview({
        userId: userId, ...body
      }));
    }

    @Patch("/")
    @UseGuards(...AUTH_GUARDS)
    async updateReview(
        @Body() body: UpdateReviewDTO
    ) {
        return await this._reviewsService.updateReview(body);
    }

    @Delete("/:id")
    @UseGuards(...AUTH_GUARDS)
    async deleteReview(@Param('id') id: number) {
        await this._reviewsService.deleteReviewsBy({ id: id });
    }

  @OnEvent("user.deleted")
  async onUserDeleted({ id }: User) {
      await this._reviewsService.deleteReviewsBy({ userId: id });
  }


}
