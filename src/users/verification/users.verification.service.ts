import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { MailClient } from "../../config/mail";
import { ForgetPasswordDTO, SignUpDTO } from "./dto";
import { createHash, createHmac } from "node:crypto";
import { UsersService } from "../users.service";
import Redis from "ioredis";
import { plainToInstance } from "class-transformer";
import { validate, validateOrReject } from "class-validator";

const VERIFICATION_EX = 300;

@Injectable()
export class UsersVerificationService {

  constructor(
    @Inject(MailClient)
    private readonly _mailClient: MailClient,
    @Inject(UsersService)
    private readonly _usersService: UsersService,
    @Inject(Redis)
    private readonly _redis: Redis,
  ) {}

  async signUp(dto: SignUpDTO) {

    const key = createHmac("sha256", dto.password)
      .update(dto.email)
      .digest("base64");

    await this.sendEmailVerificationLink(dto.email, key);

    await this._redis.set(
      key,
      JSON.stringify(dto),
      "EX",
      VERIFICATION_EX
    );
  }

  async forgetPassword(dto: ForgetPasswordDTO) {

    const userId = await this._usersService
      .getUserBy(dto)
      .then(user => user.id);

    const key = createHash("sha256")
      .update(JSON.stringify(dto))
      .digest("base64");

    await this.sendPasswordResetLink(dto.email, key);

    await this._redis.set(
      key, userId,
      "EX", VERIFICATION_EX
    );
  }

  async verifyEmail(key: string) {

    const dto = await this._redis.get(key)
      .then(str => {
        if (!str) throw new NotFoundException();
        return plainToInstance(SignUpDTO, JSON.parse(str));
      });

    await validate(dto)
      .then(errs => {
        if (errs.length) throw new NotFoundException();
      });

    await this._usersService.createUser({
      authType: "NATIVE",
      ...dto
    });
  }

  async resetPassword(key: string, newPassword: string) {

    const userId = await this._redis.get(key)
      .then(val => {
        if (!val) throw new NotFoundException();
        return Number(val);
      })
      .then(userId => {
        if (isNaN(userId)) throw new NotFoundException();
        return userId;
      });

    await this._usersService.updateUser({
      id: userId,
      password: newPassword
    });
  }

  async sendEmailVerificationLink(to: string, key: string) {

    await this._mailClient.sendMail({
      to: to,
      subject: "Cine Agora 인증 메일",
      content: {
        type: "html",
        data: (`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
              <meta charset="UTF-8">
              <title>Verification Required</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 20px; color: #333;">
              <div style="max-width: 600px; background-color: #ffffff; margin: auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: black">아래 링크를 통해 인증을 완료해주세요.</h2>
                <a 
                    href="http://localhost:3000/users/verify-email/${key}" 
                    style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007bff;color: white; border-radius: 5px; font-weight: bold;"
                >인증하기</a>
              </div>
            </body>
            </html>
        `)
      }
    });

  }

  async sendPasswordResetLink(to: string, key: string) {

    await this._mailClient.sendMail({
      to: to,
      subject: "Cine Agora 비밀번호 재설정",
      content: {
        type: "html",
        data: (`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
              <meta charset="UTF-8">
              <title>Reset Password</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f6f8fa; margin: 0; padding: 20px; color: #333;">
              <div style="max-width: 600px; background-color: #ffffff; margin: auto; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h2 style="color: black">아래 링크를 통해 비밀번호를 재설정해주세요.</h2>
                <a 
                    href="http://localhost:3000/api/users/verification/${key}" 
                    style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #007bff;color: white; border-radius: 5px; font-weight: bold;"
                >비밀번호 재설정</a>
              </div>
            </body>
            </html>
        `)
      }
    });

  }


}