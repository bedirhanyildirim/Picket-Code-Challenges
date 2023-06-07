const config = {
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['./setup.js']
}

export default config