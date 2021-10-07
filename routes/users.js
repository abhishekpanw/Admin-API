var express = require("express");
var router = express.Router();
var { register, login } = require("../Controller/Auth");
var {
  getuser,
  allusers,
  user_update,
  deleteUser,
  adduser,
  createuser,
} = require("../Controller/User");

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/adduser", createuser);
router.get("/users", allusers);
router.get("/users/:id", getuser);
router.put("/users/:id", user_update);
router.delete("/users/:id", deleteUser);

module.exports = router;
