import { Router } from 'express'
import {
  addABook,
  getAllBooks,
  getABook,
  updateABook,
  deleteABook,
} from '../controllers/controllers.js'
import { authUser, registerUser } from '../controllers/userControllers.js'

const router = Router()

router.post('/', addABook)
router.get('/', getAllBooks)

export default router
