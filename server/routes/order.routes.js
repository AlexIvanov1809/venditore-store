const Router = require("express");
const router = new Router();
const nodemailer = require("nodemailer");
const request = require("request");

router.post("/", async (req, res) => {
  try {
    const token = process.env.TOKEN;
    const chatId = process.env.CHAT_ID;
    const mailFrom = process.env.SMTP_USER;
    const mailTo = process.env.MAIL_TO;
    const mailPass = process.env.SMTP_PASS;
    const { message } = req.body;
    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    const body = JSON.stringify({
      chat_id: chatId,
      parse_mode: "Markdown",
      text: message,
    });

    request.post(
      {
        url,
        headers: { "Content-type": "application/json; charset=utf-8" },
        body,
      },
      (err) => {
        if (err) return res.status(500).send({ message: err });
      },
    );

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailFrom,
        pass: mailPass,
      },
    });
    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: "Новый заказ",
      text: message,
    });

    res.json({ message: "Sent" });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
