const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../Model/Auth");
var jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

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

exports.forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    const checkEmail = await User.findOne({ email });
    if (!checkEmail)
      return res
        .status(400)
        .json({ errors: "User with this email doesn't exist." });

    const token = jwt.sign({ id: checkEmail._id }, process.env.SECRET_KEY, {
      expiresIn: 86400,
    });

    checkEmail.resetToken = token;
    checkEmail.resetExpires = Date.now() + 86400;
    checkEmail.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.GMAIL,
      to: checkEmail.email,
      subject: "Reset Password Link",
      html: `<a href="http://localhost:3000/resetPassword/${token}" target="_blank">click here to reset your password</a>`,
    };

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        //console.log('error', err);
        res.status(400).json({ success: false, message: "Email not send" });
      } else {
        //console.log('response', data);
        res.status(201).json({
          success: true,
          message: "Email send successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).json({ errors: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    User.findOne({ resetToken: req.params.token }).then(async (user) => {
      console.log(user, "+++++++++++++++++++++++++");
      if (user == null) {
        res.json("Password link is invalid or has expired");
      } else {
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        user.password = passwordHash;
        user.resetToken = "";
        user.resetExpires = "";
        user.save().then((saveData) => {
          res.status(200).send({
            success: true,
            username: user.email,
            message: "Password update Succesfully",
          });
        });
      }
    });
  } catch (err) {
    res.status(500).json({ message: " password not updated" });
  }
};
