import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Review } from "./review.model";
import { Repository } from "typeorm";
import { CreateReviewDTO } from "./dto";
import { UpdateReviewDTO } from "./dto/UpdateReviewDTO";
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

    async getReview(id: number) {

        const review = await this._reviewsRepos
            .findOneBy( { id: id } );

        if (!review)
            throw new NotFoundException("Review Not Found");

        return review;
    }

    async getReviewsBy(options: Partial<Review>) {
        return await this._reviewsRepos.findBy(options);
    }

    async createReview(dto: CreateReviewDTO) {
        const review: Review = await this._reviewsRepos.save(dto);
        this.emitReputationEvent(review.movieId);
        return review;
    }

    async updateReview(id: number, dto: UpdateReviewDTO) {
        await this._reviewsRepos.update(id, dto);
        const review = await this.getReview(id);

        if (Object.hasOwn(dto, "rating"))
            this.emitReputationEvent(review.movieId);

        return review;
    }

    async deleteReview(id: number) {
        const review = await this.getReview(id);
        await this._reviewsRepos.remove(review);
        this.emitReputationEvent(review.movieId);
    }

    private emitReputationEvent(movieId: number) {
        this._eventEmitter.emit(
            "reputation.changed",
            { movieId: movieId },
        );
    }

}
