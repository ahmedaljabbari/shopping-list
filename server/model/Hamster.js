const mongoose = require("mongoose");

const schema = mongoose.Schema;

const hamsterSchema = new schema(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    favFood: {
      type: String,
      required: true,
    },
    loves: {
      type: String,
      required: true,
    },
    imgName: {
      type: String,
      required: true,
    },
    wins: {
      type: Number,
      required: false,
    },
    defeats: {
      type: Number,
      required: false,
    },
    games: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);
const Hamster = mongoose.model("hamster", hamsterSchema);

module.exports = Hamster;
