var express = require("express");
var router = express.Router();
var {
  about,
  getabout,
  term,
  getterm,
  contact,
  getcontact,
  update,
} = require("../Controller/Cms");

router.post("/about", about);
router.get("/getabout/:id", getabout);
router.post("/term", term);
router.get("/getterm/:id", getterm);
router.post("/contact", contact);
router.get("/getcontact/:id", getcontact);
router.put("/update/:id", update);

module.exports = router;
