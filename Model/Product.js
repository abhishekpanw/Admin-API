var mongoose = require("mongoose");
let { ObjectId } = require("mongoose");
var Product = new mongoose.Schema({
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  SubCategoryId: {
    type: ObjectId,
    ref: "SubCategory",
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

module.exports = mongoose.model("Product", Product);
