import { IsNumber, IsString } from "class-validator";

export class TokenPayload {
  @IsNumber()
  id: number;
  @IsString()
  email: string;
}