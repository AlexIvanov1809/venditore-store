const jwt = require("jsonwebtoken");
const config = require("config");
const Token = require("../models/Token");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.get("accessSecret"), {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, config.get("refreshSecret"), {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get("refreshSecret"));
    } catch (error) {
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get("accessSecret"));
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const data = await Token.findOne({ user: userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    }

    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async findToken(refreshToken) {
    return await Token.findOne({ refreshToken });
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });

    return tokenData;
  }
}

module.exports = new TokenService();
