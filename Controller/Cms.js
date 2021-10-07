const CMS = require("../Model/CMS");

exports.about = async (req, res) => {
  try {
    var aboutus = await CMS.create(req.body);
    res.send(aboutus);
  } catch (error) {
    console.log(error);
  }
};

exports.getabout = async (req, res) => {
  var getaboutus = await CMS.findOne({ _id: req.params.id });
  res.send(getaboutus);
};

exports.term = async (req, res) => {
  var termconditions = await CMS.create(req.body);
  res.send(termconditions);
};

exports.getterm = async (req, res) => {
  var termget = await CMS.findOne({ _id: req.params.id });
  res.send(termget);
};

exports.contact = async (req, res) => {
  var contactus = await CMS.create(req.body);
  res.send(contactus);
};

exports.getcontact = async (req, res) => {
  var contactget = await CMS.findOne({ _id: req.params.id });
  res.send(contactget);
};

exports.update = async (req, res) => {
  try {
    await CMS.findByIdAndUpdate(
      { _id: req.params.id },
      { description: req.body.text },
      {
        new: true,
      }
    );
    res.send("updated succesfully");
  } catch (error) {
    console.log(error);
  }
};
