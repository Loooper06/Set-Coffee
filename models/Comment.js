const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

module.exports = model;
