const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Activation letter' + process.env.API_URL,
      text: '',
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
