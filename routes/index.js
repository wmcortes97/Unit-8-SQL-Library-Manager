var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

//AsyncHandler
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

router.get("/", (req, res) => {
  res.redirect("/books");
});

/* GET home page which redirects to /books */
router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    // return res.json(books);
    res.render("index", { books });
  })
);

// /* GET full list of books */
// router.get("/books", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

// /*GET create new book form */
// router.get("/books/new", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

// /*POST posts new book to the database */
// router.get("/books/new", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

// /*GET shows book detail form */
// router.get("/books/:id", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

// /*POST updates book info in the database */
// router.get("/books/:id", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

// /*POST deletes a book */
// router.get("/books/:id/delete", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

module.exports = router;
