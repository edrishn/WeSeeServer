var express = require("express");
var router = express.Router();
var fs = require("fs");
// var cookieParser = require("cookie-parser");

router.get("/", function (req, res, next) {
  let fileName = req.query.textBox;
  fileName = fileName + ".md";

  let dirs = [];
  let response = {};

  let contentRootFiles = fs.readdirSync("./content");

  /// these three bottom lines  are written because  of the wrong file name that cached in root of content directory
  contentRootFiles.forEach((item) => {
    if (!item.endsWith("md")) dirs.push(item);
  });

  dirs.forEach((dir) => {
    let files = fs.readdirSync(`./content/${dir}`);
    files.forEach((file) => {
      if (file === fileName) {
        let fileContent = fs.readFileSync(`./content/${dir}/${file}`, {
          encoding: "utf8"
        });
        fileContent = fileContent.replace(/(\r\n|\n|\r)/gm, "");
        response[dir.toLowerCase()] = fileContent;
      }
    });
  });
  res.send(response);
});

router.post("/", function (req, res, next) {
  let fileName = req.query.textBox;
  fileName = fileName + ".md";

  let user = req.get("Login");
  if (user === null) user = req.cookies.Login;
  user = user.charAt(0).toUpperCase() + user.slice(1);

  let files = fs.readdirSync("./content/" + user);
  files.forEach((file) => {
    if (file === fileName) {
      fs.writeFileSync(`./content/${user}/${file}`, req.body, {
        encoding: "utf8"
      });
    }
  });
  res.send("changed");
});

module.exports = router;
