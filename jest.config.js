const config = {
  roots: ["<rootDir>/src"],
  modulePaths: ["./src/"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./src/setUpTests.js"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js|jsx)?$",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/index.{js,jsx}",
  ],
};

module.exports = config;
