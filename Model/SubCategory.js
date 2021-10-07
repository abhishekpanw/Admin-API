var mongoose = require("mongoose");
let { ObjectId } = require("mongoose");
var SubCategory = new mongoose.Schema({
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
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

module.exports = mongoose.model("SubCategory", SubCategory);
