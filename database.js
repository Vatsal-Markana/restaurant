const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant",
  multipleStatements: true,
});

con.connect(function (err) {
  if (err) {
    console.log(`Connection error message:${err.message}`);
    return;
  }

  console.log("Database is Connected Successfully");
});
module.exports = con;
