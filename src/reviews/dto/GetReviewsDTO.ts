import { ReviewDTO } from "./ReviewDTO";
import { PartialType } from "@nestjs/mapped-types";

export class GetReviewsDTO extends PartialType(ReviewDTO) {}

