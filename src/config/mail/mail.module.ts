import { Module } from "@nestjs/common";
import { MailClient } from "./MailClient";


@Module({
  providers: [MailClient],
  exports: [MailClient],
})
export class MailModule {}