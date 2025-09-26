module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: ["**/src/**/*.test.js", "**/e2e/**/*.test.js"]
};
