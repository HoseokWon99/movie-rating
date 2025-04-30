import { Body, Controller, ForbiddenException, Get, Inject, Patch, Query, Res, UseGuards } from "@nestjs/common";
import { ProfilesService } from "./profiles.service";
import { Response } from "express";
import { OnEvent } from "@nestjs/event-emitter";
import { User } from "../users";
import { AUTH_GUARDS } from "../auth/guards";
import { UpdateProfileDTO, UpsertProfileDTO } from "./dto";

@Controller('api/profiles')
export class ProfilesController {

  constructor(
    @Inject(ProfilesService)
    private readonly _profilesService: ProfilesService
  ) {}

  @OnEvent("user.created")
  async createProfile({ id, name }: User) {
    await this._profilesService.upsertProfile({
      userId: id,
      nickname: `${name}-${id}`,
    });
  }

  @OnEvent("user.deleted")
  async deleteProfile({ id }: User) {
    await this._profilesService.deleteProfile(id);
  }

  @Get("/")
  @UseGuards(...AUTH_GUARDS)
  async getProfile(
    @Res() res: Response
  ) {
    const userId: number = res.locals.userInfo.id;
    const profile= await this._profilesService.getProfileBy({ userId: userId });
    res.send(profile);
  }

  @Patch("/")
  @UseGuards(...AUTH_GUARDS)
  async updateProfile(
    @Body() dto: UpdateProfileDTO,
    @Res() res: Response
  ) {
    const { id } = res.locals.userInfo;

    return await this._profilesService.upsertProfile({
      userId: id, ...dto
    });
  }

  @Get("/validate-nickname")
  async validateNickname(
    @Query("nickname") nickname: string
  ) {
    return {
      available: await this._profilesService.existsProfileBy({
        nickname: nickname
      })
    };
  }

}
