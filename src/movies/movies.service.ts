import { Inject, Injectable } from '@nestjs/common';
import { TMDBClient } from "../config/tmdb";
import { MovieDetail } from "../config/tmdb/schema";
import { Movie, MovieCredit } from "./movie.model";
import { ReviewsService } from "../reviews/reviews.service";

@Injectable()
export class MoviesService {

    constructor(
        @Inject(TMDBClient)
        private readonly _tmdbClient: TMDBClient,
        @Inject(ReviewsService)
        private readonly _reviewsService: ReviewsService
    ) {  }

    async getMovie(id: number): Promise<Movie> {

        const data = await this._tmdbClient.get<MovieDetail>(
            `/movie/${id}`, {
                append_to_response: "credits",
                language: "ko"
            }
        );

        const reviews = await this._reviewsService
          .getReviewsBy({ movieId: data.id });

        return {
          id: data.id,
          title: data.title,
          releaseAt: data.release_date,
          runtime: data.runtime,
          overview: data.overview ? data.overview : "",
          posterPath: data.poster_path ? data.poster_path : "/img/no_image.png",
          genres: data.genres.map(genre => genre.name),
          credits: (function() {

            const credits: MovieCredit[] = data.credits.crew
              .filter(c => c.job === "Director")
              .map(c => {
                return {
                  id: c.id,
                  name: c.name,
                  role: c.job,
                  profilePath: c.profile_path ? c.profile_path : "/img/no_profile.png"
                };
              });

            credits.push(...data.credits.cast.map(c => {
              return {
                id: c.id,
                name: c.name,
                role: c.character,
                profilePath: c.profile_path ? c.profile_path : "/img/no_profile.png"
              };
            }));

            return credits;
          })(),
          reviews: reviews,
          reputation: (function() {

            const tot = reviews.reduce(
              (acc, curr) => acc + curr.rating,
              0
            );

            return Number(
              (tot ? tot / reviews.length : tot)
                .toFixed(1)
            );
          })()
        };

    }


}
