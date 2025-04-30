import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}\[\]:;"'<>,.?/\\]).{8,15}$/)
  password: string;
}