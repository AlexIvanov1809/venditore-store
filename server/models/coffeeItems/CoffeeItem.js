const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String, required: true },
    images: { type: Object },
    brand: { type: String, required: true },
    sortName: { type: String, required: true },
    country: { type: String },
    acidity: { type: Number, required: true },
    density: { type: Number, required: true },
    description: { type: String },
    kind: { type: String, required: true },
    method: { type: String, required: true },
    preparationMethod: { type: String, required: true },
    price: { type: Object, required: true },
    // priceQuarter: { type: String },
    // priceKg: { type: String },
    // priceDrip: { type: String },
    active: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("CoffeeItems", schema);
