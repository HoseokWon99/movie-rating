import { Matches } from "class-validator";

export class ResetPasswordDTO {
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}\[\]:;"'<>,.?/\\]).{8,15}$/)
  newPassword: string;
}