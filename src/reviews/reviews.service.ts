import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Review } from "./review.model";
import { Repository } from "typeorm";
import { CreateReviewDTO, GetReviewsDTO } from "./dto";
import { UpdateReviewDTO } from "./dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ReviewsService {

    constructor(
        @InjectRepository(Review)
        private readonly _reviewsRepos: Repository<Review>,
        @Inject(EventEmitter2)
        private readonly _eventEmitter: EventEmitter2
    ) {}

    async getReviewsBy(dto: GetReviewsDTO) {
        return await this._reviewsRepos.findBy(dto);
    }

    async createReview(dto: CreateReviewDTO) {
        const review: Review = await this._reviewsRepos.save(dto);
        this._eventEmitter.emit("review.created", review);
        return review;
    }

    async updateReview(dto: UpdateReviewDTO) {
       const review: Review = await this._reviewsRepos.save(dto);

        if (Object.hasOwn(dto, "rating"))
            this.emitReputationEvent(review.movieId);

        return review;
    }

    async deleteReviewsBy(dto: GetReviewsDTO) {

      const reviews = await this.getReviewsBy(dto)
        .then(reviews => this._reviewsRepos.remove(reviews));

      this._eventEmitter.emit("reviews.deleted", reviews);
    }



    private emitReputationEvent(movieId: number) {
        this._eventEmitter.emit(
            "reputation.changed",
            { movieId: movieId },
        );
    }

}
