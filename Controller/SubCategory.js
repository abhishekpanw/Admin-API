const SubCategory = require("../Model/SubCategory");
const Category = require("../Model/Category");
const uuid = require("uuid").v4;

exports.CategoryId = async (req, res) => {
  const Id = await Category.find();
  res.json(Id);
};

exports.addSubcategory = async (req, res) => {
  if (req.files && req.files.image) {
    let myimage = req.files.image;
    var imagename = uuid() + req.files.image.name;
    myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
      if (err) throw err;
    });
    req.body.image = imagename;
  }

  const subcategory = await SubCategory.create({
    categoryId: req.body.categoryId,
    title: req.body.title,
    image: req.body.image,
    status: req.body.status,
  });

  res.json(subcategory);
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

exports.getSubCategory = async (req, res) => {
  const category = await SubCategory.findOne({ _id: req.params.id });
  res.json(category);
};

exports.updateSubCategory = async (req, res) => {
  if (req.files && req.files.image) {
    let myimage = req.files.image;
    var imagename = uuid() + req.files.image.name;
    myimage.mv(process.cwd() + "/public/images/" + imagename, (err) => {
      if (err) throw err;
    });
    req.body.image = imagename;
  }
  try {
    const category = await SubCategory.findByIdAndUpdate(
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

exports.deleteSubCategory = async (req, res) => {
  try {
    let user = await SubCategory.findOneAndDelete({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "unsuccesful" });
    res.send(200, { message: "User Deleted successfully" });
  } catch (err) {
    console.log("error");
  }
};

exports.SubCategorystatus_update = async (req, res) => {
  const status = await SubCategory.findByIdAndUpdate(
    { _id: req.params.id },
    {
      status: req.body.status,
    },
    { new: true }
  );

  res.send(status);
};
