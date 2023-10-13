require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const connectDB = require('./db/connect')

const PORT = process.env.PORT || 5000
const app = express()

connectDB()

app.use(express.json())

routes(app)

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}...`)
})
