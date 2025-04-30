import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('users')
export class UsersViewController {

    @Get("/sign-up")
    signUp(@Res() res: Response){
        res.render("sign-up.html");
    }

    @Get("/sign-in")
    signIn(@Res() res: Response){
        res.render("sign-in.html");
    }

    @Get("/verification-email-sent")
    verificationEmailSent(@Res() res: Response){
      res.render("verification-email-sent.html");
    }

    @Get("/verify-email/:key")
    verifyEmail(@Res() res: Response){
      res.render("verify-email.html");
    }
}