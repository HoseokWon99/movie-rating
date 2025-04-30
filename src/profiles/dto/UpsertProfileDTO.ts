import { ProfileDTO } from "./ProfileDTO";
import { IntersectionType, OmitType, PartialType, PickType } from "@nestjs/mapped-types";

export class UpsertProfileDTO extends IntersectionType(
  PickType(ProfileDTO, ["userId"]),
  PartialType(OmitType(ProfileDTO, ["userId"]))
) {}