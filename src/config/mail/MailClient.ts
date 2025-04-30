import { Injectable } from "@nestjs/common";
import { createTransport } from "nodemailer";
import { Mail } from "./Mail";


@Injectable()
export class MailClient {

  private readonly _transport = createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT!),
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    }
  });

  async sendMail(mail: Mail) {

    const options = {
      to: mail.to,
      subject: mail.subject
    };

    options["from"] = process.env.MAIL_USERNAME;
    options[mail.content.type] = mail.content.data;
    await this._transport.sendMail(options);
  }

}