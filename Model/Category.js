var mongoose = require("mongoose");
var Category = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Category", Category);
