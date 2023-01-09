const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    straightPath: {
      type: String,
      require: true,
    },
    htmlPath: {
      type: String,
      require: true,
    },
  },
  {
    timestamos: true,
  }
);

module.exports = model("Images", schema);
