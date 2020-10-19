type ESLintConfig = import('eslint').Linter.Config;

export function generateConfig(): ESLintConfig {
  const config = getBaseConfig();

  applyPrettierConfig(config);

  return config;
}

function getBaseConfig(): ESLintConfig {
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

function applyPrettierConfig(config: ESLintConfig): void {
  config.extends = (config.extends || []).concat(require.resolve('eslint-config-prettier'));
  config.plugins = (config.plugins || []).concat('prettier');
  config.rules = {
    ...config.rules || {},
    'prettier/prettier': 'error'
  };
}
