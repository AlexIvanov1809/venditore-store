const { Schema, model } = require("mongoose");

const TokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Token", TokenSchema);
