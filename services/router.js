import { Router } from 'express'
import userRoutes from '../routes/userRoutes.js'
import bookRoutes from '../routes/routes.js'

const router = Router()

router.use('/api/users', userRoutes)
router.use('/api/books', bookRoutes)

export default router
