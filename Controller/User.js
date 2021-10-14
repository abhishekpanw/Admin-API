const User = require("../Model/Auth");
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");

exports.getuser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.json(user);
};

exports.user_update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    console.log("user", user);
    if (!user) return res.status(400).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    if (err) throw err;
    console.log("server Error");
  }
};

exports.allusers = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err.message);
  }
};

exports.allSubCategory = async (req, res) => {
  try {
    const Perpage = 4;
    const PAGE_SIZE = parseInt(Perpage);
    const page = parseInt(req.query.page || 1);
    const total = await SubCategory.countDocuments({});

    const users = await SubCategory.find({ new: true })
      //.populate("subcat_id")
      .limit(PAGE_SIZE)
      .skip((page - 1) * PAGE_SIZE);

    res.status(200).json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      total: total,
      current_page: page,
      per_page: PAGE_SIZE,
      user: users,
      // data: newImages,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "unsuccesful" });
    res.send(200, { message: "User Deleted successfully" });
  } catch (err) {
    console.log("error");
  }
};

exports.createuser = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(200).email(),
    password: Joi.string().min(6).max(200),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send("API Error");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already exits....");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);
  console.log(hash, "---------");

  console.log("Abhishek", req.body);
  const users = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: hash,
  });
  await users.save();
  res.send(users);
};

exports.Usercount = async (req, res) => {
  try {
    const count = await User.count({});
    res.send(200, count);
  } catch (err) {
    console.log(err);
  }
};
