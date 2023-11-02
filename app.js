import 'dotenv/config'
import path from 'path'
import express from 'express'
import helmet from 'helmet'
import { connectDB } from './db/connect.js'
import routes from './services/router.js'
import { notFound } from './middlewares/errorMiddleware.js'
import cors from 'cors'

const PORT = process.env.PORT || 5000

// Cors Config
var corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? ['http://51.20.127.34/'] : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()
connectDB()
// app.use(cors(corsOptions))

app.use(express.json())
app.use(helmet())
app.use('/', routes)

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()
  app.use(express.static(path.join(__dirname, '../react-bootstrap/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'react-bootstrap', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// app.get('/', (req, res) => {res.send('<h1>BookShop API</h1>')})

app.use(notFound)

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}...`)
})
