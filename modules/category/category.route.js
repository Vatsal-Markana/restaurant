const { authToken } = require("../../middleware/AuthMiddleware");
const {
  getCategoryController,
  insertMenuCategory,
} = require("./category.controller");

var router = require("express").Router();

router.get("/get-category", authToken, getCategoryController);
router.post("/insert-menuCategory", authToken, insertMenuCategory);
module.exports = router;
