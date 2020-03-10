module.exports = {
  displayName: 'unit',
  testMatch: ['<rootDir>/test/unit/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  testEnvironment: 'node',
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: 'output/coverage/jest',
};
