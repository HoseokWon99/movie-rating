import { Response } from "express";
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { plainToInstance } from "class-transformer";
import { TokenPayload } from "../dto";
import { validate } from "class-validator";

@Injectable()
export class IsValidToken implements CanActivate {

  constructor(
   @Inject(JwtService)
   private readonly _jwtService: JwtService,
  ) { }

  async canActivate(ctx: ExecutionContext,): Promise<boolean> {
    const res = ctx.switchToHttp().getResponse<Response>();

    const token: string = res.locals.token;
    res.locals.token = undefined;

    const userInfo = await this._jwtService.verifyAsync(token)
      .then(payload => plainToInstance(TokenPayload, payload));

    return await validate(userInfo)
      .then(errs => {
        !errs && (res.locals.userInfo = userInfo);
        return !errs;
      })
  }
}