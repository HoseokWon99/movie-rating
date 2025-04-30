import { IsNumber, IsString, Max, Min } from "class-validator";

export class UpdateReviewDTO {
    @Max(5)
    @Min(0)
    @IsNumber()
    rating: number;

    @IsString()
    content: string;

    @Min(0)
    @IsNumber()
    likes: number;
}
