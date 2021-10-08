var express = require("express");
var router = express.Router();
var {
  addcategory,
  allCategory,
  updateCategory,
  getCategory,
  deleteCategory,
  Categorystatus_update,
  Categorycount,
} = require("../Controller/Category");

var {
  addproduct,
  getProduct,
  subcategoryId,
  Productdelete,
  updateProduct,
  ProductId,
  Productcount,
} = require("../Controller/Product");

var {
  addSubcategory,
  allSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  SubCategorystatus_update,
  SubCategorycount,
} = require("../Controller/SubCategory");

{
  /*====================== Category =====================================*/
}

router.post("/addcategory", addcategory);
router.get("/allCategory/", allCategory);
router.put("/updateCategory/:id", updateCategory);
router.get("/getCategory/:id", getCategory);
router.delete("/deleteCategory/:id", deleteCategory);
router.put("/Categorystatus_update/:id", Categorystatus_update);
router.get("/Categorycount", Categorycount);

{
  /*======================  SubCategory =====================================*/
  router.post("/addSubcategory", addSubcategory);
  router.get("/allSubCategory", allSubCategory);
  router.get("/getSubCategory/:id", getSubCategory);
  router.put("/updateSubCategory/:id", updateSubCategory);
  router.delete("/deleteSubCategory/:id", deleteSubCategory);
  router.put("/SubCategorystatus_update/:id", SubCategorystatus_update);
  router.get("/SubCategorycount", SubCategorycount);
}

{
  /*======================  Product =====================================*/
  router.post("/addproduct", addproduct);
  router.get("/getProduct", getProduct);
  router.get("/subcategoryId/:categoryId", subcategoryId);
  router.delete("/Productdelete/:id", Productdelete);
  router.put("/updateProduct/:id", updateProduct);
  router.get("/ProductId/:id", ProductId);
  router.get("/Productcount", Productcount);
}

module.exports = router;
