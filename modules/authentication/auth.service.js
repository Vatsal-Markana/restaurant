const md5 = require("md5");
const con = require("../../database");
const ResponseHelper = require("../../Helper/ResponseHelper");
var CryptoJS = require("crypto-js");
var moment = require("moment");

const mysql = require("mysql");
const { CRYPTOJSKEY } = require("../../config");

var userLoginService = async (userLoginData) => {
  try {
    const emailckeck =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Email pattern check
    if (emailckeck.test(userLoginData.email)) {
      //check email validation
      const sql = `SELECT * FROM users  WHERE users.email = ${mysql.escape(
        userLoginData.email
      )} AND users.password =  ${mysql.escape(md5(userLoginData.password))};`;

      let response = await new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
          if (err) {
            console.log(
              `==========ERROR FROM LOGIN AUTH SERVICE QUERY============`
            );
            console.log(`${err}`);
            resolve(
              ResponseHelper.serviceToController(
                0,
                [],
                `Something went to wrong`
              )
            );
          } else {
            if (result.length > 0) {
              var auth_token = CryptoJS.AES.encrypt(
                userLoginData.email +
                  "_" +
                  moment().format("YYYY-MM-DD h:mm:ss"),
                CRYPTOJSKEY
              ).toString(); // Auth Token

              let sql = `UPDATE users SET auth_token = "${auth_token}" WHERE users.u_id = ${result[0].u_id}`;
              con.query(sql, function (updateqry_err1, updateqry_result1) {
                if (updateqry_err1) {
                  console.log(
                    `==========ERROR FROM LOGIN AUTH SERVICE QUERY============`
                  );
                  console.log(`${updateqry_err1}`);

                  resolve(
                    ResponseHelper.serviceToController(
                      0,
                      [],
                      `Something went to wrong`
                    )
                  );
                } else {
                  if (result.length > 0) {
                    result[0].auth_token = auth_token;
                    resolve(
                      ResponseHelper.serviceToController(
                        1,
                        result[0],
                        "Welcoming to the Restaurant"
                      )
                    );
                  } else {
                    resolve(
                      ResponseHelper.serviceToController(
                        0,
                        [],
                        "Invalid Email OR Password"
                      )
                    );
                  }
                }
              });
            } else {
              resolve(
                ResponseHelper.serviceToController(
                  0,
                  [],
                  "Invalid Email OR Password"
                )
              );
            }
          }
        });
      });
      return response;
    } else {
      return ResponseHelper.serviceToController(0, [], "Invalid Email");
    }
  } catch (error) {
    console.log(`==========ERROR FROM LOGIN AUTH SERVICE============`);
    console.log(`${error}`);
    return ResponseHelper.serviceToController(
      0,
      [],
      "ERROR FROM LOGIN AUTH SERVICE CATCH"
    );
  }
};

var registrationService = async (userRegisterData) => {
  try {
    const emailckeck =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Email pattern check
    const isnum = /^\d+$/; //check number
    if (
      emailckeck.test(userRegisterData.email) &&
      isnum.test(userRegisterData.mo_no)
    ) {
      //validations check
      const insertuser = `INSERT INTO users(first_name, last_name, mo_no, email, password) VALUES (${mysql.escape(
        userRegisterData.first_name
      )},${mysql.escape(userRegisterData.last_name)},${mysql.escape(
        userRegisterData.mo_no
      )},${mysql.escape(userRegisterData.email)},${mysql.escape(
        md5(userRegisterData.password)
      )})`;
      let response = await new Promise((resolve, reject) => {
        con.query(
          insertuser,
          async function (insertuser_err, insertuser_result) {
            if (insertuser_err) {
              console.log(
                `==========ERROR FROM REGISTER AUTH SERVICE QUERY============`
              );
              console.log(`${insertuser_err}`);
              resolve(
                ResponseHelper.serviceToController(
                  0,
                  [],
                  `Something went to wrong`
                )
              );
            } else {
              if (insertuser_result.affectedRows > 0) {
                const userdata = `SELECT * FROM users  WHERE users.u_id = ${insertuser_result.insertId};`;

                con.query(
                  userdata,
                  async function (userdata_err1, userdata_result1) {
                    if (userdata_err1) {
                      console.log(
                        `==========ERROR FROM REGISTER AUTH SERVICE QUERY============`
                      );
                      console.log(`${userdata_err1}`);
                      resolve(
                        ResponseHelper.serviceToController(
                          0,
                          [],
                          `Something went to wrong`
                        )
                      );
                    } else {
                      if (userdata_result1.length > 0) {
                        resolve(
                          ResponseHelper.serviceToController(
                            1,
                            userdata_result1[0],
                            "Welcoming to the Restaurant"
                          )
                        );
                      } else {
                        resolve(
                          ResponseHelper.serviceToController(
                            0,
                            [],
                            "Data not Found"
                          )
                        );
                      }
                    }
                  }
                );
              } else {
                resolve(
                  ResponseHelper.serviceToController(
                    0,
                    [],
                    "User Is Not Registered"
                  )
                );
              }
            }
          }
        );
      });

      return response;
    } else {
      return ResponseHelper.serviceToController(
        0,
        [],
        "Please Enter Proper Data"
      );
    }
  } catch (error) {
    console.log(`==========ERROR FROM REGISTER AUTH SERVICE============`);
    console.log(`${error}`);
    return ResponseHelper.serviceToController(
      0,
      [],
      "ERROR FROM REGISTER AUTH SERVICE CATCH"
    );
  }
};

module.exports = {
  userLoginService,
  registrationService,
};
