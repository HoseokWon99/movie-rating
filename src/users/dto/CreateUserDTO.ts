import { UserDTO } from "./UserDTO";
import { OmitType } from "@nestjs/mapped-types";

export class CreateUserDTO extends OmitType(UserDTO, ["id"]) {}
