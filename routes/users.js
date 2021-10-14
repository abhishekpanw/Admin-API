var express = require("express");
var router = express.Router();
var {
  register,
  login,
  forget_password,
  resetPassword,
} = require("../Controller/Auth");
var {
  getuser,
  allusers,
  user_update,
  deleteUser,
  adduser,
  createuser,
  Usercount,
} = require("../Controller/User");

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/adduser", createuser);
router.get("/users", allusers);
router.get("/users/:id", getuser);
router.put("/users/:id", user_update);
router.delete("/users/:id", deleteUser);
router.get("/Usercount", Usercount);
router.post("/forget_password", forget_password);
router.post("/resetPassword/:token", resetPassword);

module.exports = router;
