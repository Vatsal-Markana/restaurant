const { userlogin, registration } = require("./auth.controller");

var router = require("express").Router();

router.post("/login", userlogin);
router.post("/registration", registration);

module.exports = router;
