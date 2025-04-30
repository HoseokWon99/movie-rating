import { ReviewDTO } from "./ReviewDTO";
import { IntersectionType, PartialType, PickType } from "@nestjs/mapped-types";

export class UpdateReviewDTO extends IntersectionType(
  PickType(ReviewDTO, ["id"]),
  PartialType(PickType(ReviewDTO,["content", "rating", "likes"]))
) {}