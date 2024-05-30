const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    name: "shooter",
  },
});

module.exports = mongoose.model("category", categorySchema);
