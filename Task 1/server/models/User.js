import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const usersPath = path.join(__dirname, '..', '..','data', 'users.json')

class User {
  static getAllUsers() {
    const usersData = fs.readFileSync(usersPath, 'utf8')
    return JSON.parse(usersData)
  }
}

export default User
