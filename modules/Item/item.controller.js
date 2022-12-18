const ResponseHelper = require("../../Helper/ResponseHelper");

const { getItemService, insertItemService } = require("./item.service");

var getItemController = async (req, res) => {
  try {
    console.log(req.params);
    const data = await getItemService(req.params);

    if (data.status == 1) {
      ResponseHelper.ok(res, data.data, data.description);
    } else {
      ResponseHelper.error(res, data.description);
    }
  } catch (error) {
    console.log(`==========ERROR FROM GET ITEM CONTROLLER============`);
    console.log(`${error}`);
  }
};
var insertItemController = async (req, res) => {
  try {
    const data = await insertItemService(req.body);
    if (data.status == 1) {
      ResponseHelper.ok(res, data.data, data.description);
    } else {
      ResponseHelper.error(res, data.description);
    }
  } catch (error) {
    console.log(`==========ERROR FROM INSERT ITEM CONTROLLER============`);
    console.log(`${error}`);
  }
};

module.exports = {
  getItemController,
  insertItemController,
};
