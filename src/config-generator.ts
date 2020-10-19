import { Linter } from 'eslint';

export function generateConfig(): Linter.Config {
  let config = getBaseConfig();

  return config;
}

function getBaseConfig(): Linter.Config {
  return {
    env: {
      browser: true,
      es2021: true,
    },
    parser: '@babel/eslint-parser',
    extends: [
      require.resolve('eslint-config-airbnb-base'),
    ],
    rules: {
      'semi': ['error', 'always'],
      'func-names': 'off',
      // Import plugin
      'import/prefer-default-export': 'off'
    }
  };
}
