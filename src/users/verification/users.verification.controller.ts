import { Body, Controller, Get, Inject, Logger, Param, Post, Query, Req, Res } from "@nestjs/common";
import { UsersVerificationService } from "./users.verification.service";
import { ForgetPasswordDTO, SignUpDTO } from "./dto";
import { Response } from "express";
import { ResetPasswordDTO } from "./dto";

@Controller('api/users/verification')
export class UsersVerificationController {
  private readonly _logger = new Logger("UsersController");

  constructor(
    @Inject(UsersVerificationService)
    private readonly _usersVerificationService: UsersVerificationService,
  ) {  }

  @Post("/sign-up")
  async signUp(
    @Body() body: SignUpDTO,
    @Res() res: Response,
  ) {
    await this._usersVerificationService.signUp(body);
    res.redirect("/users/verification-email-sent");
  }

  @Post("/forget-password")
  async forgetPassword(
    @Body() body: ForgetPasswordDTO,
    @Res() res: Response,
  ) {
    await this._usersVerificationService.forgetPassword(body);
  }

  @Get("/verify-email/:key")
  async verifyEmail(
   @Param("key") key: string
  ) {
    await this._usersVerificationService.verifyEmail(key);
  }

  @Post("/reset-password/:key")
  async resetPassword(
    @Param("key") key: string,
    @Body() { newPassword }: ResetPasswordDTO,
  ) {
    await this._usersVerificationService.resetPassword(
      key, newPassword
    );
  }

}
