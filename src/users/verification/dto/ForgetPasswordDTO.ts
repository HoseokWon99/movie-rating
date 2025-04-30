import { UserDTO } from "../../dto";
import { PickType } from "@nestjs/mapped-types";

export class ForgetPasswordDTO
  extends PickType(UserDTO, ["name", "email"]) {}