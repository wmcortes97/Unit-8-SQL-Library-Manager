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

/* GET full list of books */
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

/*POST create new book  */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render("form-error", { book });
      } else {
        throw error;
      }
    }
  })
);

/*GET shows book detail form */
router.get(
  "/books/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book });
    } else {
      const error = new Error("Book not found in database");
      error.status = 404;
      next(error);
    }
  })
);

/*POST updates book info in the database */
router.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id);
      if (book) {
        await book.update(req.body);
        res.redirect("/");
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id;
        res.render("form-error", { book });
      } else {
        throw error;
      }
    }
  })
);

/*POST deletes a book */
router.post(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (book) {
      await book.destroy();
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
