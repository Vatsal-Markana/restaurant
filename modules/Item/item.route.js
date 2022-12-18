const { authToken } = require("../../middleware/AuthMiddleware");

const { getItemController, insertItemController } = require("./item.controller");

var router = require("express").Router();

router.get("/get-item/:m_id", authToken, getItemController);
router.post("/insert-item", authToken, insertItemController);

module.exports = router;
