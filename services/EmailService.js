import { IEmailService } from "@/lib/interfaces/IEmailServices";
import { sendMail } from "@/lib/sendMail";

export class EmailService extends IEmailService {
  async send(subject, to, body) {
    return sendMail(subject, to, body);
  }
}
