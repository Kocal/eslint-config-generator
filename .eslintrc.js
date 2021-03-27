const { generateConfig } = require('./packages/eslint-config-generator/dist'); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = generateConfig({
  typescript: true,
});
