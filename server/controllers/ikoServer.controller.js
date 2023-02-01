const ApiError = require("../exceptions/api.error");
const ikoServerService = require("../services/ikoServer.service");
const request = require("request");

class IkoServerController {
  async getItems(req, res, next) {
    try {
      const url = "https://api-ru.iiko.services/api/1/access_token";
      const body = JSON.stringify({
        apiLogin: "a1de9ca2-fe9",
      });

      await request.post(
        {
          url,
          headers: { "Content-type": "application/json; charset=utf-8" },
          body,
        },
        (err, resp, body) => {
          if (err) return res.status(500).send({ message: err });
          if (!err && resp.statusCode == 200) {
            const token = JSON.parse(body);
            return res.send(token);
          }
        },
      );
    } catch (e) {
      next(e);
    }
  }

  async fetchAllItems(req, res, next) {
    try {
      const { token } = req.body;
      const url = "https://api-ru.iiko.services/api/1/nomenclature";
      const body = JSON.stringify({
        organizationId: "daa0e069-84cc-4885-bbd5-be89e78a15a9",
        startRevision: 0,
      });

      request.post(
        {
          url,
          headers: {
            "Content-type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
          body,
        },
        (err, resp, body) => {
          if (err) return res.status(500).send({ message: err });
          if (!err && resp.statusCode == 200) {
            const data = JSON.parse(body);
            return res.send(data);
          }
        },
      );
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new IkoServerController();
