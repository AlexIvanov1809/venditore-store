const Router = require("express");
const router = new Router();
const config = require("config");
const nodemailer = require("nodemailer");
const request = require("request");

router.post("/", async (req, res) => {
  try {
    const token = config.get("token");
    const chatId = config.get("chatId");
    const mailFrom = config.get("mailFrom");
    const mailTo = config.get("mailTo");
    const mailPass = config.get("mailPass");
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
      }
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

    res.json({ message: "Send" });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
