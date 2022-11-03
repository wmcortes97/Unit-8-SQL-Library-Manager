var express = require("express");
var path = require("path");
const Sequelize = require("./models/index.js").sequelize;

var indexRouter = require("./routes/index");

var app = express();

//authenticate
(async () => {
  try {
    await Sequelize.sync();
    await Sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err) {
    console.log("Global error handler called", err);
  }
  if (err.status === 404) {
    res.render("page-not-found", { err });
  } else {
    err.message =
      err.message || `Oops!  It looks like something went wrong on the server.`;
    res.status(err.status || 500).render("error", { err });
  }
});

module.exports = app;
