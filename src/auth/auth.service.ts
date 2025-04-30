import { Inject, Injectable } from "@nestjs/common";
import { SignInDTO, TokenPair, TokenPayload } from "./dto";
import { encryptPassword } from "../utils/encryptPassord";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users";
import Redis from "ioredis";

@Injectable()
export class AuthService {

  constructor(
    @Inject(UsersService)
    private readonly _usersService: UsersService,
    @Inject(JwtService)
    private readonly _jwtService: JwtService,
    @Inject(Redis)
    private readonly _blacklist: Redis,
  ) {}

  async signIn({ email, password }: SignInDTO): Promise<TokenPair> {

    const userInfo: TokenPayload = await this._usersService
      .getUserBy({
        email: email,
        password: encryptPassword(password)
      })
      .then(user => user.id)
      .then(id => ({ id: id, email: email }));

    return {
      accessToken: this._jwtService.sign(
        userInfo,
        {
          secret: process.env.JWT_SECRET,
          expiresIn: Number(process.env.JWT_ACCESS_TOKEN_DURATION)
        }
      ),
      refreshToken: this._jwtService.sign(
        userInfo,
        {
          secret: process.env.JWT_SECRET,
          expiresIn: Number(process.env.JWT_REFRESH_TOKEN_DURATION)
        }
      )
    };
  }

  async signOut(token: string) {
    await this._blacklist.set(
      token,
      1,
      "EX",
      Number(process.env.JWT_ACCESS_TOKEN_DURATION)
    );
  }

  renew(userInfo: TokenPayload) {
    return this._jwtService.sign(
      userInfo,
      { expiresIn: Number(process.env.JWT_ACCESS_TOKEN_DURATION) }
    );
  }

}
