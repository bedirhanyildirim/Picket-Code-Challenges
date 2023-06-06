import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'

/* Create the express server */
const app = express()

/* Middleware */
app.use(bodyParser.json())

/* Routers */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes)

export default app