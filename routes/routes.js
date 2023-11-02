import { Router } from 'express'
import {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} from '../controllers/controllers.js'
import { authUser, registerUser } from '../controllers/userControllers.js'

// const routes = (app) => {
//   app
//     .route('/books')

//     .get(getAllBooks)

//     .post(addABook)

//   app
//     .route('/books/:id')

//     .get(getABook)

//     .patch(updateABook)

//     .delete(deleteABook)

//   // app.post('register', authUser)
//   // app.post('api/auth', registerUser)
// }

const router = Router()

router.post('/', addABook)

export default router
