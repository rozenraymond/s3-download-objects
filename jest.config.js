module.exports = {
  testMatch: ['**/test/**/*.(js)', '**/?(*.)+(test).(js)'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'output/coverage/jest',
};
