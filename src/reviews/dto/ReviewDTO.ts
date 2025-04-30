import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";


export class ReviewDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  movieId: number;

  @Max(5)
  @Min(0)
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @Min(0)
  @IsNumber()
  likes: number;
}