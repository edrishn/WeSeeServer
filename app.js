var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var contentRouter = require("./routes/content");
const bodyParser = require("body-parser");

var cors = require("cors");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.text({ type: "text/*" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/content", contentRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
