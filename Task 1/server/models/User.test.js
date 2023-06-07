import User from "./User.js"

describe('User Model', () => {
  describe('getAllUsers', () => {
    it('should return a list of users', () => {
      const allUsers = User.getAllUsers()
      expect(allUsers).toHaveLength(1)
    })
  })
})