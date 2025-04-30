import { CreateReviewDTO } from "./CreateReviewDTO";

export type GetReviewsDTO
    = Partial<Pick<CreateReviewDTO, "userId" | "movieId">>;

