import express, { json } from 'express'
import userRoutes from './routes/userRoutes.js'
import fruitRoutes from './routes/fruitRoutes.js'
import cors from 'cors'
import 'dotenv/config'
const app = express()

app.use(json())
app.use(cors())
app.disable('x-powered-by')

app.use('', userRoutes)
app.use('', fruitRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
