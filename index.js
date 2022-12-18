const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paths = require("path");
var fs = require("fs");
const fileupload = require("express-fileupload");
var CryptoJS = require("crypto-js");
const { PORT, NODE_ENV } = require("./config");

env = NODE_ENV || "development";

// routes
var authRoutes = require("./modules/authentication/auth.route");
var categoryRoutes = require("./modules/category/category.route");
var itemRoutes = require("./modules/Item/item.route");

const app = express();
app.use(cors({ origin: true }));
app.use(fileupload());
app.use(express.static("files"));

app.use(
  "/images",
  express.static(paths.join(__dirname, "/public/assets/images"))
);

app.use(bodyParser.json({ limit: "1024mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "2048mb",
    extended: true,
    parameterLimit: 1024000,
  })
);

// Routes
app.use(authRoutes, categoryRoutes, itemRoutes);

const server = app.listen(PORT, function (error) {});
