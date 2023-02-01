const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  refreshToken: { type: String, require: true },
  isActivated: { type: Boolean, default: false },
});

module.exports = model("Token", TokenSchema);
