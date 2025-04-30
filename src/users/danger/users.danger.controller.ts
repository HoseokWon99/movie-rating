import { Body, Controller, Delete, Inject, Patch, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "../users.service";
import { UpdatePasswordDTO } from "./dto";
import { AUTH_GUARDS } from "../../auth/guards";
import { Response } from "express";
import { TokenPayload } from "../../auth/dto";

@Controller("users")
export class UsersDangerController {

  constructor(
    @Inject(UsersService)
    private readonly _usersService: UsersService,
  ) {}

  @Patch("/update/password")
  @UseGuards(...AUTH_GUARDS)
  async updatePassword(
    @Body() { newPassword }: UpdatePasswordDTO,
    @Res() res: Response
  ) {
    const { id } = res.locals.userInfo;
    res.locals.userInfo = undefined;

    await this._usersService.updateUser({
      id: id, password: newPassword
    });

    res.sendStatus(200);
  }

  @Delete("/quit")
  async quit(@Res() res: Response) {
    const userInfo: TokenPayload = res.locals.userInfo;
    res.locals.userInfo = undefined;
    await this._usersService.deleteUser(userInfo);
    res.sendStatus(200);
  }

}