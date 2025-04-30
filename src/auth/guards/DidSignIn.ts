import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { Response } from "express";

@Injectable()
export class DidSignIn implements CanActivate {

  constructor(
    @Inject(Redis)
    private readonly _blacklist: Redis,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {

    const { token } = ctx.switchToHttp()
      .getRequest<Response>().locals;

    return await this._blacklist.get(token)
      .then(val => !val);
  }
}