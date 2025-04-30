import { UserDTO } from "./UserDTO";
import { PartialType } from "@nestjs/mapped-types";

export class GetUserDTO extends PartialType(UserDTO) {}

