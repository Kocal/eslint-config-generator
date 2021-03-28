import { generateConfig } from '../dist';

describe('Configuration generator', function () {
  it('should generate the default configuration', function () {
    const config = generateConfig();

    expect(config).toMatchObject({
      root: true,
      env: {
        browser: true,
        es2021: true,
      },
      parser: '@babel/eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: ['airbnb-base', 'prettier'],
      plugins: ['prettier'],
      settings: {
        'import/resolver': {
          node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
          webpack: {},
        },
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
      },
      rules: {
        semi: ['error', 'always'],
        'func-names': 'off',
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'e'] }],
        // Import plugin
        'import/prefer-default-export': 'off',
        'import/extensions': [
          'error',
          'always',
          { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never', 'd.ts': 'never' },
        ],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: [
              'test/**',
              'tests/**',
              'spec/**',
              '**/__tests__/**',
              '**/__mocks__/**',
              '**/cypress/**',
              'test.{js,jsx}',
              'test-*.{js,jsx}',
              '**/*{.,_}{test,spec}.{js,jsx}',
              '**/jest.config.js',
              '**/jest.setup.js',
              '**/vue.config.js',
              '**/webpack.config.js',
              '**/webpack.config.*.js',
              '**/rollup.config.js',
              '**/rollup.config.*.js',
              '**/gulpfile.js',
              '**/gulpfile.*.js',
              '**/.eslintrc.js',
              '**/postcss.config.js',
              '**/tailwind.config.{js,ts}',
              '**/vite.config.{js,ts}',
              '**/prettier.config.js',
            ],
            optionalDependencies: false,
          },
        ],
        // Prettier
        'prettier/prettier': 'error',
      },
    });
  });
});
