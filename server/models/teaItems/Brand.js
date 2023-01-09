const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    value: {
      type: String,
      require: true,
    },
  },
  {
    timestamos: true,
  }
);

module.exports = model("TeaBrands", schema);
