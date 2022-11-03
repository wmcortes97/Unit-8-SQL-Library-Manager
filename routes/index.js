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
    res.render("new-book", { book: {} });
  })
);

/*POST create new book  */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    // const book = await Book.create(req.body);
    console.log(req.body);
  })
);

// /*GET shows book detail form */
// router.get(
//   "/books/:id",
//   asyncHandler(async (req, res) => {
//     const book = await Book.findByPk(req.params.id);
//     if (book) {
//       res.render("update-book", { book });
//     } else {
//       res.sendStatus(404);
//     }
//   })
// );

// /*POST updates book info in the database */
// router.post(
//   "/books/:id",
//   asyncHandler(async (req, res) => {
//     let book;
//     try {
//       book = await Book.findByPk(req.params.id);
//       if (book) {
//         await book.update(req.body);
//         res.redirect("/books/" + book.id);
//       } else {
//         res.sendStatus(404);
//       }
//     } catch (error) {
//       if (error.name === "SequelizeValidationError") {
//         book = await Book.build(req.body);
//         book.id = req.params.id;
//         res.render("form-error", { book, error: error.errors });
//       } else {
//         throw error;
//       }
//     }
//   })
// );

// /*POST deletes a book */
// router.get("/books/:id/delete", function (req, res, next) {
//   asyncHandler(async (req, res) => {});
// });

module.exports = router;
