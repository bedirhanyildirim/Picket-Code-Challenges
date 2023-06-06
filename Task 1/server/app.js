import express from 'express'

/* Create the express server */
const app = express()

/* Routers */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app