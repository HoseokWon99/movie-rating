import { Controller, Get, Inject, Param } from '@nestjs/common';
import { MoviesService } from "./movies.service";

@Controller('api/movies')
export class MoviesController {

    constructor(
        @Inject(MoviesService)
        private readonly _moviesService: MoviesService
    ) {}

    @Get("/:movieId")
    async getMovie(
        @Param('movieId') movieId: number
    ) {
        return await this._moviesService.getMovie(movieId);
    }
}
