import { UserDTO } from "./UserDTO";
import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/mapped-types";

export class UpdateUserDTO
  extends IntersectionType(
    PickType(UserDTO, ["id"]),
    PartialType(OmitType(UserDTO, ["id"])),
  ) {}