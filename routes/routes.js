const {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} = require('../controllers/controllers')

const routes = (app) => {
  app
    .route('/books')

    .get(getAllBooks)

    .post(addABook)

  app
    .route('/books/:id')

    .get(getABook)

    .patch(updateABook)

    .delete(deleteABook)

  app.get('/', (req, res) => {
    res.send('<h1>BookShop API</h1>')
  })
}

module.exports = routes
