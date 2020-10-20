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
        }
      },
      extends: [
        require.resolve('eslint-config-airbnb-base'),
        require.resolve('eslint-config-prettier'),
      ],
      plugins: ['prettier'],
      settings: {
        'import/resolver': {
          [require.resolve('eslint-import-resolver-node')]: {},
          [require.resolve('eslint-import-resolver-webpack')]: {}
        },
        'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
      },
      rules: {
        'semi': ['error', 'always'],
        'func-names': 'off',
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'e'] }],
        // Import plugin
        'import/prefer-default-export': 'off',
        'import/extensions': ['error', 'always', { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' }],
        // Prettier
        'prettier/prettier': 'error'
      }
    };

    expect(generateConfig(userOptions)).toEqual(expectedConfig);
  });

  describe('Vue', () => {
    test('Basic support', function () {
      const userOptions: UserOptions = {
        vue: true
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
          }
        },
        extends: [
          require.resolve('eslint-plugin-vue/lib/configs/recommended'),
          require.resolve('eslint-config-airbnb-base'),
          require.resolve('eslint-config-prettier'),
          require.resolve('eslint-config-prettier/vue'),
        ],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            [require.resolve('eslint-import-resolver-node')]: {},
            [require.resolve('eslint-import-resolver-webpack')]: {}
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        },
        rules: {
          'semi': ['error', 'always'],
          'func-names': 'off',
          'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'e'] }],
          // Import plugin
          'import/prefer-default-export': 'off',
          'import/extensions': ['error', 'always', { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' }],
          // Prettier
          'prettier/prettier': 'error',
          // Vue
          'vue/component-name-in-template-casing': [`error`, `PascalCase`, {
            'registeredComponentsOnly': false,
            'ignores': [],
          }],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
        }
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });

    test('Different version', function () {
      const userOptions: UserOptions = {
        vue: {
          version: 3
        }
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
          }
        },
        extends: [
          require.resolve('eslint-plugin-vue/lib/configs/vue3-recommended'),
          require.resolve('eslint-config-airbnb-base'),
          require.resolve('eslint-config-prettier'),
          require.resolve('eslint-config-prettier/vue'),
        ],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            [require.resolve('eslint-import-resolver-node')]: {},
            [require.resolve('eslint-import-resolver-webpack')]: {}
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        },
        rules: {
          'semi': ['error', 'always'],
          'func-names': 'off',
          'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'e'] }],
          // Import plugin
          'import/prefer-default-export': 'off',
          'import/extensions': ['error', 'always', { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' }],
          // Prettier
          'prettier/prettier': 'error',
          // Vue
          'vue/component-name-in-template-casing': [`error`, `PascalCase`, {
            'registeredComponentsOnly': false,
            'ignores': [],
          }],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
        }
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });

    test('Different config', function () {
      const userOptions: UserOptions = {
        vue: {
          config: 'essential'
        }
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
          }
        },
        extends: [
          require.resolve('eslint-plugin-vue/lib/configs/essential'),
          require.resolve('eslint-config-airbnb-base'),
          require.resolve('eslint-config-prettier'),
          require.resolve('eslint-config-prettier/vue'),
        ],
        plugins: ['prettier'],
        settings: {
          'import/resolver': {
            [require.resolve('eslint-import-resolver-node')]: {},
            [require.resolve('eslint-import-resolver-webpack')]: {}
          },
          'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        },
        rules: {
          'semi': ['error', 'always'],
          'func-names': 'off',
          'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'acc', 'e'] }],
          // Import plugin
          'import/prefer-default-export': 'off',
          'import/extensions': ['error', 'always', { js: 'never', jsx: 'never', mjs: 'never', ts: 'never', tsx: 'never' }],
          // Prettier
          'prettier/prettier': 'error',
          // Vue
          'vue/component-name-in-template-casing': [`error`, `PascalCase`, {
            'registeredComponentsOnly': false,
            'ignores': [],
          }],
          'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
        }
      };

      expect(generateConfig(userOptions)).toEqual(expectedConfig);
    });
  });
});
