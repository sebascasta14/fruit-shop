const express = require('express')
const { json } = require('express')
const userRoutes = require('./routes/userRoutes.js')
const fruitRoutes = require('./routes/fruitRoutes.js')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.use('', userRoutes)
app.use('', fruitRoutes)

const PORT = process.env.PORT || 3001
const DB_URL = process.env.DB_URL ?? ""

mongoose.connect(DB_URL)

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
