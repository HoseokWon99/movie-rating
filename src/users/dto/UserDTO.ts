import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";
import { AuthType } from "../user.model";

export class UserDTO {

  @IsNumber()
  id: number;

  @IsIn(["NATIVE", "KAKAO", "GOOGLE" ])
  authType: AuthType;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}\[\]:;"'<>,.?/\\]).{8,15}$/)
  password?: string;

}