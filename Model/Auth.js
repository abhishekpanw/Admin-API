var mongoose = require("mongoose");
var Schema = new mongoose.Schema(
  {
    fullName: { type: String, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      minlength: 3,
      maxlength: 200,
      unique: true,
    },
    password: {
      type: String,
      minlength: 3,
      maxlength: 1024,
    },
    resetToken: {
      type: String,
    },
    resetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", Schema);
