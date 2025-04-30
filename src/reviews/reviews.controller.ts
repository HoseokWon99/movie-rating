import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ReviewsService } from "./reviews.service";
import { UpdateReviewDTO } from "./dto/UpdateReviewDTO";
import { CreateReviewDTO } from "./dto";

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
    async createReview(@Body() body: CreateReviewDTO) {
        return await this._reviewsService.createReview(body);
    }

    @Patch("/:id")
    async updateReview(
        @Param('id') id: number,
        @Body() body: UpdateReviewDTO
    ) {
        return await this._reviewsService.updateReview(id, body);
    }

    @Delete("/:id")
    async deleteReview(@Param('id') id: number) {
        await this._reviewsService.deleteReview(id);
    }
}
