import { generateConfig } from '../dist';

describe('config-generator', function () {
  test('base configuration', function () {
    expect(generateConfig()).toEqual({
      env: {
        browser: true,
        es2021: true,
      },
      parser: '@babel/eslint-parser',
      extends: [
        require.resolve('eslint-config-airbnb-base'),
        require.resolve('eslint-config-prettier'),
      ],
      plugins: ['prettier'],
      rules: {
        'semi': ['error', 'always'],
        'func-names': 'off',
        // Import plugin
        'import/prefer-default-export': 'off',
        // Prettier
        'prettier/prettier': 'error'
      }
    });
  });
});
