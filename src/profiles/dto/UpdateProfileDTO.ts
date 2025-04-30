import { UpsertProfileDTO } from "./UpsertProfileDTO";
import { OmitType, PartialType } from "@nestjs/mapped-types";

export class UpdateProfileDTO extends PartialType(
    OmitType(UpsertProfileDTO, ["userId"])
) {}