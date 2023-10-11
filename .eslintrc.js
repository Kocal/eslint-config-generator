const { generateConfig } = require('./packages/eslint-config-generator/dist'); // eslint-disable-line @typescript-eslint/no-var-requires

const config = generateConfig({
  typescript: true,
});

config.rules['no-param-reassign'][1].ignorePropertyModificationsFor.push('config'); // the ESLintConfig we "mutate"
config.rules['max-len'] = 'off';

module.exports = config;
