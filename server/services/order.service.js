const nodemailer = require('nodemailer');
const request = require('request');

class OrderService {
  async sendOrder(message) {
    const token = process.env.TOKEN;
    const chatId = process.env.CHAT_ID;
    const mailFrom = process.env.SMTP_USER;
    const mailTo = process.env.MAIL_TO;
    const mailPass = process.env.SMTP_PASS;
    const url = 'https://api.telegram.org/bot' + token + '/sendMessage';
    const body = JSON.stringify({
      chat_id: chatId,
      parse_mode: 'Markdown',
      text: message,
    });

    request.post(
      {
        url,
        headers: { 'Content-type': 'application/json; charset=utf-8' },
        body,
      },
      (err) => {
        if (err) throw err;
      },
    );

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: mailFrom,
        pass: mailPass,
      },
    });
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: 'Новый заказ',
      text: message,
    });

    return 'Заказ отправлен';
  }
  catch(error) {
    console.log(error);
    throw Error({
      message: 'На сервере произошла ошибка. Попробуйте позже',
    });
  }
}

module.exports = new OrderService();
