const ResponseHelper = require("../../Helper/ResponseHelper");

const { userLoginService, registrationService } = require("./auth.service");

var userlogin = async (req, res) => {
  try {
    if (req.body.email != "" && req.body.password != "") {
      const userLoginData = req.body;

      const data = await userLoginService(userLoginData);
      if (data.status == 1) {
        ResponseHelper.ok(res, data.data, data.description);
      } else {
        ResponseHelper.error(res, data.description);
      }
    } else {
      ResponseHelper.error(res, "Please Enter Email OR Password");
    }
  } catch (error) {
    console.log(`==========ERROR FROM LOGIN AUTH CONTROLLER============`);
    console.log(`${error}`);
  }
};

var registration = async (req, res) => {
  try {
    if (
      req.body.firstname != "" ||
      req.body.firstname != undefined ||
      req.body.lastname != "" ||
      req.body.lastname != undefined ||
      req.body.email != "" ||
      req.body.email != undefined ||
      req.body.mo_no != "" ||
      req.body.mo_no != undefined ||
      req.body.password != "" ||
      req.body.password != undefined
    ) {
      const userRegisterData = req.body;
      const data = await registrationService(userRegisterData);

      if (data.status == 1) {
        ResponseHelper.ok(res, data.data, data.description);
      } else {
        ResponseHelper.error(res, data.description);
      }
    } else {
      ResponseHelper.error(res, "Please Enter Proper Data");
    }
  } catch (error) {
    console.log(`==========ERROR FROM REGISTER AUTH CONTROLLER============`);
    console.log(`${error}`);
  }
};

module.exports = {
  userlogin,
  registration,
};
