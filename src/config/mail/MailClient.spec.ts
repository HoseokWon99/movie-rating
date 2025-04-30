import { MailClient } from './MailClient';
import { Mail } from './Mail';
import { config } from "dotenv";

config({ path: __dirname + "/../../../.env", });

describe('MailClient', () => {
  let mailClient: MailClient;

  beforeEach(() => {
    mailClient = new MailClient();
  });

  it('should send an email with correct options', async () => {

    const mail: Mail = {
      to: 'yamae2468@naver.com',
      subject: 'Test Subject',
      content: {
        type: 'text',
        data: 'Test email body',
      },
    };

    await mailClient.sendMail(mail);
  });

  it('should handle different content types', async () => {

    const mail: Mail = {
      to: 'hs1j333@gmail.com',
      subject: 'HTML Subject',
      content: {
        type: 'html',
        data: '<h1>Hello</h1>',
      },
    };

    await mailClient.sendMail(mail);
  });
});