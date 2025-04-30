import { ReviewDTO } from "./ReviewDTO";
import { OmitType, PickType } from "@nestjs/mapped-types";

export class CreateReviewDTO extends PickType(
  ReviewDTO, ["userId", "movieId", "rating", "content"]
) {}

export class CreateReviewRequestDTO
  extends OmitType(CreateReviewDTO, ["userId"]) {}