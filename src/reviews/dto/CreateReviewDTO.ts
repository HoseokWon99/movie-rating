import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDTO {
    @IsNumber()
    userId: number;

    @IsNumber()
    movieId: number;

    @Max(5)
    @Min(0)
    @IsNumber()
    rating: number;

    @IsString()
    content: string;
}
