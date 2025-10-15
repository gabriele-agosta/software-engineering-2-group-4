const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.[jt]s?(x)"], 
  transform: {
    ...tsJestTransformCfg,
  },
  verbose: true, 
};
