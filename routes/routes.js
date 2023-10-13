import {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} from '../controllers/controllers.js'

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
}

export default routes
