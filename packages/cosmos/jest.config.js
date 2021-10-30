module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: [
    '<rootDir>/jest.crypto-setup.js',
  ],
};
