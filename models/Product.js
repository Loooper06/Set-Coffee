const { default: mongoose } = require("mongoose");
require("./Comment");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    short_description: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: true,
    },
    suitable: {
      type: String,
      required: false,
    },
    smell: {
      type: String,
      required: false,
    },
    score: {
      type: Number,
      required: false,
      default: 5,
    },
    tags: {
      type: [String],
      default: [],
      required: true,
    },
    comments: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Product || mongoose.model("Product", schema);

module.exports = model;
