import 'dotenv/config'
import express from 'express'
import { connectDB } from './db/connect.js'
// import routes from './routes/routes.js'
import routes from './services/router.js'

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

app.use(express.json())
app.use(routes)
// routes(app)


app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}...`)
})
