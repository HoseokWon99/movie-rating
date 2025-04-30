import { ProfileDTO } from "./ProfileDTO";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class GetProfileDTO extends PartialType(
  OmitType(ProfileDTO, ["imageURL"])
) {}