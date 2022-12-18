const con = require("../database");
const ResponseHelper = require("../Helper/ResponseHelper");

const mysql = require("mysql");
var authToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization != undefined ||
      req.headers.authorization != null
    ) {
      let authentication = req.headers.authorization.replace("Bearer ", "");
      let sql = `SELECT u_id FROM users WHERE users.auth_token = ${mysql.escape(
        authentication
      )}`;
      con.query(sql, function (err, result) {
        if (err) {
          ResponseHelper.error(res, [], "Error");
        } else {
          if (result.length > 0) {
            req.body.u_id = result[0].u_id;
            next();
          } else {
            ResponseHelper.invalidToken(res, "Unauthorized User");
          }
        }
      });
    } else {
      ResponseHelper.invalidToken(res, "Unauthorized User");
    }
  } catch (error) {
    console.log(`==========ERROR FROM Auth MiddleWare ============`);
    console.log(`${error}`);
  }
};
module.exports = {
  authToken,
};
