const {defaults} = require('jest-config');

module.exports = {
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>(.*)/node_modules/(?!auto-jest-cucumber).*"],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "feature"
  ],
  haste: {
    providesModuleNodeModules: ["auto-jest-cucumber"]
  }
};
module.exports.watchPathIgnorePatterns = module.exports.testPathIgnorePatterns;