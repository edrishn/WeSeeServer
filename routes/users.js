var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  var array = [];
  for (var i = 1; i < 5; i++) {
    array.push({ name: "Test *" + i + "*", value: i });
  }

  res.send(array);
});

module.exports = router;
