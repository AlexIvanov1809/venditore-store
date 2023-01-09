const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: Object, required: true },
    brand: { type: String, required: true },
    package: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    weight: { type: String, required: true },
    recipe: { type: String },
    price: { type: String, required: true },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("TeaItems", schema);
