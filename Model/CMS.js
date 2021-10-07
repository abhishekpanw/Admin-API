var mongoose = require("mongoose");
var CMS = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CMS", CMS);
