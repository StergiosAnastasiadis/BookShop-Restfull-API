const {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook
} = require("../controllers/controllers");

const routes = (app) => {
  app.route("/books")

    .get(getAllBooks)

    .post(addABook);

  app.route("/books/:id")

    .get(getABook)

    .patch(updateABook)

    .delete(deleteABook);
}

module.exports = routes;
