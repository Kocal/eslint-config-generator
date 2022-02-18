import { ESLintConfig, UserOptions } from '@kocal/eslint-config-generator-common';
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
              'test.{js,jsx,ts,tsx}',
              'test-*.{js,jsx,ts,tsx}',
              '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}',
              '**/jest.config.{js,ts}',
              '**/jest.setup.{js,ts}',
              '**/vue.config.{js,ts}',
              '**/webpack.config.{js,ts}',
              '**/webpack.config.*.{js,ts}',
              '**/rollup.config.{js,ts}',
              '**/rollup.config.*.{js,ts}',
              '**/gulpfile.{js,ts}',
              '**/gulpfile.*.{js,ts}',
              '**/.eslintrc.{js,ts}',
              '**/postcss.config.{js,ts}',
              '**/tailwind.config.{js,ts}',
              '**/vite.config.{js,ts}',
              '**/prettier.config.{js,cjs,ts}',
              '**/.prettierrc.{js,cjs,ts}',
            ],
            optionalDependencies: false,
          },
        ],
        // Prettier
        'prettier/prettier': 'error',
      },
    });
  });

  describe('plugin: typescript', function () {
    it('should generate a configuration with TypeScript support', function () {
      const userOptions: UserOptions = {
        typescript: true,
      };

      const config = generateConfig(userOptions);

      expect(config.extends).toEqual([
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
      ]);
      expect(config.parser).toEqual('@typescript-eslint/parser');
      expect(config.parserOptions.extraFileExtensions).toBeUndefined();
      expect(config.rules).toMatchObject({
        '@typescript-eslint/naming-convention': [
          'error',
          { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow', trailingUnderscore: 'allow' },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
          },
          { selector: 'typeLike', format: ['PascalCase'] },
          { selector: 'property', format: ['camelCase', 'snake_case', 'PascalCase', 'UPPER_CASE'] },
          { selector: 'function', format: ['camelCase', 'PascalCase'] },
        ],
      });
      expect(config.overrides).toMatchObject([
        {
          files: ['*.js', '*.jsx', '*.vue'],
          rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
          },
        },
        {
          files: ['*.ts', '*.tsx'],
          rules: {
            'no-unused-vars': 'off',
            camelcase: 'off',
            'global-require': 'off',
            'no-use-before-define': 'off',
            'no-loop-func': 'off',
            'no-shadow': 'off',
          },
        },
      ]);
    });
  });

  describe('plugin: vue', function () {
    it('should generate a configuration with Vue support', function () {
      const userOptions: UserOptions = {
        vue: true,
      };

      const config = generateConfig(userOptions);

      expect(config.extends).toEqual(['plugin:vue/recommended', 'airbnb-base', 'prettier', 'prettier/vue']);
      expect(config.parser).toEqual('vue-eslint-parser');
      expect(config.parserOptions.parser).toEqual('@babel/eslint-parser');
      expect(config.rules).toMatchObject({
        'vue/component-name-in-template-casing': [
          `error`,
          `PascalCase`,
          {
            registeredComponentsOnly: false,
          },
        ],
        'vue/html-self-closing': ['error', { html: { void: 'always' } }],
        'vue/no-duplicate-attr-inheritance': ['error'],
        'vue/no-empty-component-block': ['error'],
        'vue/no-template-target-blank': ['error'],
        'vue/padding-line-between-blocks': ['error'],
        'vue/v-on-function-call': ['error'],
        'vue/no-boolean-default': ['error'],
      });
    });

    it('should generate a configuration with Vue 3 support', function () {
      const userOptions: UserOptions = {
        vue: {
          version: 3,
        },
      };

      const config: ESLintConfig = generateConfig(userOptions);

      expect(config.extends).toEqual(['plugin:vue/vue3-recommended', 'airbnb-base', 'prettier', 'prettier/vue']);
    });

    it('should generate a configuration with Vue support and preset "config"', function () {
      const userOptions: UserOptions = {
        vue: {
          config: 'essential',
        },
      };

      const config = generateConfig(userOptions);

      expect(config.extends).toEqual(['plugin:vue/essential', 'airbnb-base', 'prettier', 'prettier/vue']);
    });

    it('should generate a configuration with TypeScript and Vue support, and automatically handle .vue files', function () {
      const userOptions: UserOptions = {
        typescript: true,
        vue: true,
      };

      const config = generateConfig(userOptions);

      expect(config.extends).toEqual([
        'plugin:vue/recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/vue',
        'prettier/@typescript-eslint',
      ]);
      expect(config.parser).toEqual('vue-eslint-parser');
      expect(config.parserOptions.parser).toEqual('@typescript-eslint/parser');
      expect(config.parserOptions.extraFileExtensions).toEqual(['.vue']);
      expect(config.overrides).toMatchObject([
        {
          files: ['*.js', '*.jsx'],
          rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
          },
        },
        {
          files: ['*.ts', '*.tsx', '*.vue'],
          rules: {
            'no-unused-vars': 'off',
            camelcase: 'off',
            'global-require': 'off',
            'no-use-before-define': 'off',
            'no-useless-constructor': 'off',
            'no-loop-func': 'off',
            'no-shadow': 'off',
          },
        },
      ]);
    });

    it('should generate a configuration with TypeScript and Vue support, but .vue files are not handled', function () {
      const userOptions: UserOptions = {
        typescript: {
          vueComponents: false,
        },
        vue: true,
      };

      const config = generateConfig(userOptions);

      expect(config.parserOptions.extraFileExtensions).toEqual(['.vue']);
      expect(config.overrides).toMatchObject([
        {
          files: ['*.js', '*.jsx', '*.vue'],
          rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
          },
        },
        {
          files: ['*.ts', '*.tsx'],
          rules: {
            'no-unused-vars': 'off',
            camelcase: 'off',
            'global-require': 'off',
            'no-use-before-define': 'off',
            'no-useless-constructor': 'off',
            'no-loop-func': 'off',
            'no-shadow': 'off',
          },
        },
      ]);
    });
  });
});
