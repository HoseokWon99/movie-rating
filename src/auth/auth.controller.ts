import { Body, Controller, Get, Inject, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { SignInDTO, TokenPayload } from "./dto";
import { Response } from "express";
import { DidSignIn, HasAuthorization, IsValidToken, IsValidUser } from "./guards";

@Controller('api/auth')
export class AuthController {

    constructor(
        @Inject(AuthService)
        private readonly _authService: AuthService
    ) {}

    @Post("/sign-in")
    async signIn(
        @Body() data: SignInDTO,
        @Res() res: Response,
    ) {

        const { accessToken, refreshToken }
            = await this._authService.signIn(data);

        res.cookie(
            "refresh-token", refreshToken,
            { maxAge: Number(process.env.JWT_REFRESH_TOKEN_DURATION) }
        );

        return { accessToken: accessToken };
    }

    @Get("/sign-out")
    @UseGuards(HasAuthorization, DidSignIn)
    async signOut(@Res() res: Response) {
        const token: string = res.locals.token;
        await this._authService.signOut(token);
    }

    @Get("/renew")
    @UseGuards(HasAuthorization, IsValidToken, IsValidUser)
    renew(@Res() res: Response) {
        const userInfo: TokenPayload = res.locals.userInfo;
        res.locals.userInfo = undefined;
        res.send({ accessToken: this._authService.renew(userInfo) });
    }



}
