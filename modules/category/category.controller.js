const ResponseHelper = require("../../Helper/ResponseHelper");
const {
  getCategoryService,
  insertMenuCategoryService,
} = require("./category.service");

var insertMenuCategory = async (req, res) => {
  try {
    if (req.body.m_name != "" && req.body.u_id != "" && req.body.u_id!=0) {
      const data = await insertMenuCategoryService(req.body);

      if (data.status == 1) {
        ResponseHelper.ok(res, data.data, data.description);
      } else {
        ResponseHelper.error(res, data.description);
      }
    } else {
      ResponseHelper.error(res, "Please Enter Proper Data");
    }
  } catch (error) {
    console.log(`==========ERROR FROM INSERT MENU CONTROLLER============`);
    console.log(`${error}`);
  }
};
var getCategoryController = async (req, res) => {
  try {
    const data = await getCategoryService(req.body);

    if (data.status == 1) {
      ResponseHelper.ok(res, data.data, data.description);
    } else {
      ResponseHelper.error(res, data.description);
    }
  } catch (error) {
    console.log(`==========ERROR FROM GET CATEGORY CONTROLLER============`);
    console.log(`${error}`);
  }
};

module.exports = {
  getCategoryController,
  insertMenuCategory,
};
