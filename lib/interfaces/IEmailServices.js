export class IEmailService {
  async send(subject, to, body) {
    throw new Error("send() must be implemented");
  }
}
