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

/* GET home page which redirects to /books */
router.get("/", (req, res) => {
  res.redirect("/books");
});

// /* GET full list of books */
router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("index", { books });
  })
);

/*GET create new book form */
router.get(
  "/books/new",
  asyncHandler(async (req, res) => {
    res.render("new-book");
  })
);

/*POST posts new book to the database */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/books/" + book.id);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Article.build(req.body);
        res.render("form-error", {
          book,
          errors: error.errors,
        });
      } else {
        throw error;
      }
    }
  })
);

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
