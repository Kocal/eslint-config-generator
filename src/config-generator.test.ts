import { generateConfig, UserOptions } from '../dist';
import { ESLintConfig } from './config-generator';

describe('config-generator', function () {
  test('base configuration', function () {
    const userOptions: UserOptions = {};
    const expectedConfig: ESLintConfig = {
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
          node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
          webpack: {},
        },
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
          { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
        ],
        // Prettier
        'prettier/prettier': 'error',
      },
    };

    expect(generateConfig(userOptions)).toEqual(expectedConfig);
  });

  describe('Vue', () => {
    test('Basic support', function () {
      const userOptions: UserOptions = {
        vue: true,
      };
      const expectedConfig: ESLintConfig = {
        env: {
          browser: true,
          es2021: true,
        },
        parser: 'vue-eslint-parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        extends: ['plugin:vue/recommended', 'airbnb-base', 'prettier', 'prettier/vue'],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
            webpack: {},
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
            { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
          ],
          // Prettier
          'prettier/prettier': 'error',
          // Vue
          'vue/component-name-in-template-casing': [
            `error`,
            `PascalCase`,
            {
              registeredComponentsOnly: false,
              ignores: [],
            },
          ],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
        },
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });

    test('Different version', function () {
      const userOptions: UserOptions = {
        vue: {
          version: 3,
        },
      };
      const expectedConfig: ESLintConfig = {
        env: {
          browser: true,
          es2021: true,
        },
        parser: 'vue-eslint-parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        extends: ['plugin:vue/vue3-recommended', 'airbnb-base', 'prettier', 'prettier/vue'],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
            webpack: {},
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
            { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
          ],
          // Prettier
          'prettier/prettier': 'error',
          // Vue
          'vue/component-name-in-template-casing': [
            `error`,
            `PascalCase`,
            {
              registeredComponentsOnly: false,
              ignores: [],
            },
          ],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
        },
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });

    test('Different config', function () {
      const userOptions: UserOptions = {
        vue: {
          config: 'essential',
        },
      };
      const expectedConfig: ESLintConfig = {
        env: {
          browser: true,
          es2021: true,
        },
        parser: 'vue-eslint-parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        extends: ['plugin:vue/essential', 'airbnb-base', 'prettier', 'prettier/vue'],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
            webpack: {},
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
            { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
          ],
          // Prettier
          'prettier/prettier': 'error',
          // Vue
          'vue/component-name-in-template-casing': [
            `error`,
            `PascalCase`,
            {
              registeredComponentsOnly: false,
              ignores: [],
            },
          ],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
        },
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });
  });

  describe('TypeScript', function () {
    test('Basic support', function () {
      const userOptions: UserOptions = {
        typescript: true,
      };
      const expectedConfig: ESLintConfig = {
        env: {
          browser: true,
          es2021: true,
        },
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        extends: [
          'airbnb-base',
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'prettier',
          'prettier/@typescript-eslint',
        ],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
            webpack: {},
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
            { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
          ],
          // TypeScript
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
            { selector: 'property', format: ['camelCase', 'snake_case', 'PascalCase'] },
          ],
          // Prettier
          'prettier/prettier': 'error',
        },
        overrides: [
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
              // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
              // does not work with type definitions
              'no-unused-vars': 'off',
              camelcase: 'off',
            },
          },
        ],
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });

    test('With Vue support, and automatically enabled .vue files support', function () {
      const userOptions: UserOptions = {
        typescript: true,
        vue: true,
      };
      const expectedConfig: ESLintConfig = {
        env: {
          browser: true,
          es2021: true,
        },
        parser: 'vue-eslint-parser',
        parserOptions: {
          parser: '@typescript-eslint/parser',
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
        },
        extends: [
          'plugin:vue/recommended',
          'airbnb-base',
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'prettier',
          'prettier/vue',
          'prettier/@typescript-eslint',
        ],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
            webpack: {},
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
            { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
          ],
          // TypeScript
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
            { selector: 'property', format: ['camelCase', 'snake_case', 'PascalCase'] },
          ],
          // Vue
          'vue/component-name-in-template-casing': [
            `error`,
            `PascalCase`,
            {
              registeredComponentsOnly: false,
              ignores: [],
            },
          ],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
          // Prettier
          'prettier/prettier': 'error',
        },
        overrides: [
          {
            files: ['*.js', '*.jsx' /* , '*.vue' */],
            rules: {
              '@typescript-eslint/explicit-function-return-type': 'off',
              '@typescript-eslint/explicit-module-boundary-types': 'off',
            },
          },
          {
            files: ['*.ts', '*.tsx'],
            rules: {
              // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
              // does not work with type definitions
              'no-unused-vars': 'off',
              camelcase: 'off',
            },
          },
        ],
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });

    test('With Vue support, and disabled .vue files support', function () {
      const userOptions: UserOptions = {
        typescript: {
          vueComponents: false,
        },
        vue: true,
      };
      const expectedConfig: ESLintConfig = {
        env: {
          browser: true,
          es2021: true,
        },
        parser: 'vue-eslint-parser',
        parserOptions: {
          parser: '@typescript-eslint/parser',
          ecmaFeatures: {
            jsx: true,
          },
        },
        extends: [
          'plugin:vue/recommended',
          'airbnb-base',
          'plugin:@typescript-eslint/eslint-recommended',
          'plugin:@typescript-eslint/recommended',
          'prettier',
          'prettier/vue',
          'prettier/@typescript-eslint',
        ],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'] },
            webpack: {},
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
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
            { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' },
          ],
          // TypeScript
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
            { selector: 'property', format: ['camelCase', 'snake_case', 'PascalCase'] },
          ],
          // Vue
          'vue/component-name-in-template-casing': [
            `error`,
            `PascalCase`,
            {
              registeredComponentsOnly: false,
              ignores: [],
            },
          ],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
          // Prettier
          'prettier/prettier': 'error',
        },
        overrides: [
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
              // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
              // does not work with type definitions
              'no-unused-vars': 'off',
              camelcase: 'off',
            },
          },
        ],
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });
  });
});
