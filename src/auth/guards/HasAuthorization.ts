import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request, Response } from "express";


@Injectable()
export class HasAuthorization implements CanActivate {

  canActivate(ctx: ExecutionContext): boolean {

    const { authorization } = ctx.switchToHttp()
      .getRequest<Request>().headers;

    if (!authorization) return false;

    const res = ctx.switchToHttp().getResponse<Response>();
    res.locals.token = authorization.split(' ')[1];
    return true;
  }
}