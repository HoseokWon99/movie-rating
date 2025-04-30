import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Response } from "express";
import { TokenPayload } from "../dto";
import { UsersService } from "../../users";

@Injectable()
export class IsValidUser implements CanActivate {

  constructor(
   @Inject(UsersService)
   private readonly _usersService: UsersService,
  ) { }

  async canActivate(ctx: ExecutionContext,): Promise<boolean> {
    const res = ctx.switchToHttp().getResponse<Response>();
    const userInfo: TokenPayload = res.locals.userInfo;
    return await this._usersService.existsUserBy(userInfo);
  }
}