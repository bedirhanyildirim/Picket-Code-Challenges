import app from './server/app.js'

/* Define listening port */
const port = 3000

/* Start listening the port */
app.listen(port, () => {
  console.log(`picket-user-management listening on port ${port}`)
})