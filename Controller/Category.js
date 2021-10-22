const Category = require("../Model/Category");
const uuid = require("uuid").v4;

exports.addcategory = async (req, res) => {
  if (req.files && req.files.image) {
    let myimage = req.files.image;
    var imagename = uuid() + req.files.image.name;
    myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
      if (err) throw err;
    });
    req.body.image = imagename;
  }

  const category = await Category.create({
    title: req.body.title,
    image: req.body.image,
    status: req.body.status,
  });
  res.json(category);
};

exports.allCategory = async (req, res) => {
  try {
    const Perpage = 4;
    const PAGE_SIZE = parseInt(Perpage);
    const page = parseInt(req.query.page || 1);
    const total = await Category.countDocuments({});
    const { search } = req.query;

    const users = await Category.find(
      search ? { title: { $regex: ".*" + search + ".*" } } : {}
    )
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

exports.updateCategory = async (req, res) => {
  if (req.files && req.files.image) {
    let myimage = req.files.image;
    var imagename = uuid() + req.files.image.name;
    myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
      if (err) throw err;
    });
    req.body.image = imagename;
  }
  try {
    const category = await Category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(category);
  } catch (err) {
    if (err) throw err;
    console.log("server Error");
  }
};

exports.getCategory = async (req, res) => {
  const category = await Category.findOne({ _id: req.params.id });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  try {
    let user = await Category.findOneAndDelete({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "unsuccesful" });
    res.send(200, { message: "User Deleted successfully" });
  } catch (err) {
    console.log("error");
  }
};

exports.Categorystatus_update = async (req, res) => {
  const status = await Category.findByIdAndUpdate(
    { _id: req.params.id },
    {
      status: req.body.status,
    },
    { new: true }
  );

  res.send(status);
};

exports.Categorycount = async (req, res) => {
  try {
    const count = await Category.count({});
    res.send(200, count);
  } catch (err) {
    console.log(err);
  }
};
