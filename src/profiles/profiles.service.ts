import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./profile.model";
import { Repository } from "typeorm";
import { GetProfileDTO, UpsertProfileDTO } from "./dto";

@Injectable()
export class ProfilesService {

  constructor(
        @InjectRepository(Profile)
        private readonly _profilesRepos: Repository<Profile>,
  ) {}

  async getProfileBy(dto: GetProfileDTO): Promise<Profile> {
    const profile = await this._profilesRepos.findOneBy(dto);
    if (!profile) throw new NotFoundException();
    return profile;
  }

  async existsProfileBy(dto: GetProfileDTO): Promise<boolean> {
    return await this._profilesRepos.findOneBy(dto)
      .then(profile => !!profile);
  }

  async upsertProfile(dto: UpsertProfileDTO): Promise<Profile> {

    if (Object.hasOwn(dto, "nickname")) {

      const profile = await this._profilesRepos
        .findOneBy({ nickname: dto.nickname });

      if (profile && profile.userId !== dto.userId)
        throw new BadRequestException();
    }

    return await this._profilesRepos.save(dto);
  }

  async deleteProfile(dto: GetProfileDTO) {
    await this._profilesRepos.delete(dto);
  }

}
