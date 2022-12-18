const md5 = require("md5");
const con = require("../../database");
const ResponseHelper = require("../../Helper/ResponseHelper");

const mysql = require("mysql");
var fs = require("fs");
const paths = require("path");
var insertItemService = async (data) => {
  try {
    let imagefile="";
    if(data.i_image != undefined && data.i_image != null && data.i_image !="")
    {
      let uploadfile = data.i_image;
      let buff = new Buffer.from(uploadfile, "base64");
      let rendom = Math.floor(Math.random() * 100000 + 1);
      imagefile = rendom + ".jpg";
      let newpath = paths.join(__dirname, "../../public/assets/images/");
      fs.writeFileSync(`${newpath}${imagefile}`, buff);
    }
    const insertitem = `INSERT INTO items( m_id, i_name, i_image) VALUES (${mysql.escape(
      data.m_id
    )},${mysql.escape(data.i_name)},${mysql.escape(imagefile)})`;
    let response = await new Promise((resolve, reject) => {
      con.query(insertitem, function (err, result) {
        if (err) {
          console.log(
            `==========ERROR FROM INSERT ITEM SERVICE QUERY============`
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
                `Item Inserted Successfully`
              )
            );
          } else {
            resolve(
              ResponseHelper.serviceToController(0, [], `Item Not Inserted`)
            );
          }
        }
      });
    });
    return response;
  } catch (error) {
    console.log(`==========ERROR FROM INSERT ITEM SERVICE CATCH============`);
    console.log(`${error}`);
    return ResponseHelper.serviceToController(
      0,
      [],
      "ERROR FROM INSERT ITEM  SERVICE CATCH"
    );
  }
};

var getItemService = async (data) => {
  try {
    const sql = `SELECT * FROM items WHERE m_id = ${data.m_id}`;

    let response = await new Promise((resolve, reject) => {
      con.query(sql, function (err, result) {
        if (err) {
          console.log(
            `==========ERROR FROM GET ITEM SERVICE QUERY============`
          );
          console.log(`${err}`);
          resolve(
            ResponseHelper.serviceToController(0, [], `Something went to wrong`)
          );
        } else {
          if (result.length > 0) {
            resolve(
              ResponseHelper.serviceToController(1, result, `List of Items`)
            );
          } else {
            resolve(
              ResponseHelper.serviceToController(
                0,
                [],
                `There were no Item found`
              )
            );
          }
        }
      });
    });
    return response;
  } catch (error) {
    console.log(`==========ERROR FROM GET ITEM SERVICE CATCH============`);
    console.log(`${error}`);
    return ResponseHelper.serviceToController(
      0,
      [],
      "ERROR FROM GET ITEM SERVICE CATCH"
    );
  }
};

module.exports = {
  getItemService,
  insertItemService,
};
