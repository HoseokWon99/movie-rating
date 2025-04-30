import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class ProfileDTO {
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    nickname: string;

    @IsUrl()
    imageURL: string;
}

