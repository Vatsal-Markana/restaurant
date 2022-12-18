const md5 = require("md5");
const con = require("../../database");
const ResponseHelper = require("../../Helper/ResponseHelper");

var moment = require("moment");

const mysql = require("mysql");

var insertMenuCategoryService = async (data) => {
  try {
    let insertSQL = `INSERT INTO menu (m_name,u_id) VALUES (${mysql.escape(
      data.m_name
    )},${mysql.escape(data.u_id)})`;
    let response = await new Promise((resolve, reject) => {
      con.query(insertSQL, async function (err, result) {
        if (err) {
          console.log(
            `==========ERROR FROM INSERT MENU CATEGORY SERVICE QUERY============`
          );
          console.log(`${err}`);
          resolve(
            ResponseHelper.serviceToController(0, [], `Something went to wrong`)
          );
        } else {
          if (result.affectedRows > 0) {
            resolve(
              ResponseHelper.serviceToController(
                1,
                [],
                "Menu Category Insert Successfully.."
              )
            );
          }
        }
      });
    });

    return response;
  } catch (error) {
    console.log(
      `==========ERROR FROM INSERT MENU CATEGORY SERVICE============`
    );
    console.log(`${error}`);
    return ResponseHelper.serviceToController(
      0,
      [],
      "ERROR FROM INSERT MENU CATEGORY SERVICE CATCH"
    );
  }
};
var getCategoryService = async (data) => {
  try {
    const sql = `SELECT * FROM menu WHERE u_id = ${data.u_id}`;

    let response = await new Promise((resolve, reject) => {
      con.query(sql, function (err, result) {
        if (err) {
          console.log(
            `==========ERROR FROM GET CATEGORY SERVICE QUERY============`
          );
          console.log(`${err}`);
          resolve(
            ResponseHelper.serviceToController(0, [], `Something went to wrong`)
          );
        } else {
          if (result.length > 0) {
            resolve(
              ResponseHelper.serviceToController(
                1,
                result,
                `List of Categories`
              )
            );
          } else {
            resolve(
              ResponseHelper.serviceToController(
                0,
                [],
                `There were no categories found`
              )
            );
          }
        }
      });
    });
    return response;
  } catch (error) {
    console.log(`==========ERROR FROM GET CATEGORY SERVICE CATCH============`);
    console.log(`${error}`);
    return ResponseHelper.serviceToController(
      0,
      [],
      "ERROR FROM GET CATEGORY SERVICE CATCH"
    );
  }
};

module.exports = {
  getCategoryService,
  insertMenuCategoryService,
};
