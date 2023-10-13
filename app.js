import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import { connectDB } from './db/connect.js'
import routes from './services/router.js'

const PORT = process.env.PORT || 5000
const app = express()
connectDB()

app.use(express.json())
app.use(helmet())
app.use(routes)

app.get('/', (req, res) => {
  res.send('<h1>BookShop API</h1>')
})

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}...`)
})
