import { Matches } from "class-validator";

export class UpdatePasswordDTO {
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}\[\]:;"'<>,.?/\\]).{8,15}$/)
  oldPassword: string;
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}\[\]:;"'<>,.?/\\]).{8,15}$/)
  newPassword: string;
}