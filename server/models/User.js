const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    role: {
      type: String,
      enum: ["owner", "admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("User", UserSchema);
