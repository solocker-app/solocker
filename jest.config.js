const { pathsToModuleNameMapper } = require("ts-jest");
const nextJest = require("next/jest.js");
const {compilerOptions} = require("./tsconfig.json");

/**
 * @type {import("next/jest")}
 */
const createJestConfig = nextJest({
  dir: "./",
});

/**
 * @type {import("jest").Config}
 */
const config = {
  roots: ["<rootDir>"],
  coverageProvider: "v8",
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

module.exports = createJestConfig(config);
