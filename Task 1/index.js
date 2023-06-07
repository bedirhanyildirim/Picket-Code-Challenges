import app from './server/app.js'
import { configDotenv } from 'dotenv'

/* Define listening port */
const port = 3000

configDotenv({
  path: '.env'
})

/* Start listening the port */
app.listen(port, () => {
  console.log(`picket-user-management listening on port ${port}`)
})