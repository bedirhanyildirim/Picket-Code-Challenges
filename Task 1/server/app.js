import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'
import { apiKeyAuth } from './middlewares/authMiddleware.js'

/* Create the express server */
const app = express()

/* Middleware */
app.use(bodyParser.json())
app.use(apiKeyAuth)

/* Routers */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes)

export default app