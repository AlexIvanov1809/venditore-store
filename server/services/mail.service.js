const nodemailer = require("nodemailer");
const config = require("config");

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.get("mailFrom"),
        pass: config.get("mailPass"),
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: config.get("mailFrom"),
      to,
      subject: "Activation letter",
      text: "",
      html: `
			<div>
				<h1>Для активации перейдите по ссылке</h1>
				<a href="${link}">${link}</a>
			</div>
			`,
    });
  }
}

module.exports = new MailService();
