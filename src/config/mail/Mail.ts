import { Readable } from "node:stream";

interface MailContent {
  type: "text" | "html";
  data: string | Buffer | Readable;
}

export interface Mail {
  to: string;
  subject: string;
  content: MailContent;
}