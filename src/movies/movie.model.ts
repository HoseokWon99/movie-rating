import { Review } from "../reviews/review.model";

export interface MovieCredit {
    id: number;
    profilePath: string;
    name: string;
    role: string;
}

export interface Movie {
  id: number;
  title: string;
  releaseAt: string;
  runtime: number;
  overview: string;
  posterPath: string;
  genres: string[];
  credits: MovieCredit[];
  reviews: Review[];
  reputation: number;
}