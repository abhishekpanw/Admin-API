const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../Model/Auth");
var jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(200).email(),
    password: Joi.string().min(6).max(200),
  });

  delete req.body.confirm_password;
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
  const jwtSecretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ email: users.email }, jwtSecretKey);
  //res.send(token);
  res.send({ users, token });
};

exports.login = async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().min(3).max(200).email(),
    password: Joi.string().min(3).max(200),
  });
  const { error } = Schema.validate(req.body);
  if (error) return res.status(400).json({ message: "Validation error" });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Invalid email address" });

  let validpassword = await bcrypt.compare(req.body.password, user.password);
  if (!validpassword)
    return res.status(400).json({ message: "incorrect password" });

  const jwtSecretKey = process.env.SECRET_KEY;
  const token = await jwt.sign(
    { _id: user._id, fullName: user.fullName, email: user.email },
    jwtSecretKey
  );
  res.send({ user, token });
};
