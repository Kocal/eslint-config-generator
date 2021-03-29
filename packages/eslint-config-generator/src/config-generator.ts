import {
  ESLintConfig,
  normalizeUserOptions,
  Options,
  PluginCallback,
  UserOptions,
} from '@kocal/eslint-config-generator-common';
import { isPackageInstalled } from './package-helper';

function getBaseConfig(options: Options): ESLintConfig {
  return {
    root: options.root,
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
    extends: ['airbnb-base'],
    settings: {
      'import/resolver': {
        node: {
          extensions: options.knownExtensions,
        },
        webpack: {},
      },
      'import/extensions': options.knownExtensions,
    },
    rules: {
      semi: ['error', 'always'],
      'func-names': 'off',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'state', // for vuex state
            'acc', // for reduce accumulators
            'e', // for e.returnvalue
          ],
        },
      ],
      // Import plugin
      'import/prefer-default-export': 'off',
      'import/extensions': [
        'error',
        'always',
        options.knownExtensions.reduce((acc, knownExtension) => {
          acc[knownExtension.replace(/^./, '')] = 'never';
          return acc;
        }, {} as { [k: string]: 'never' }),
      ],
      // Forbid the use of extraneous packages
      // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
      // paths are treated both as absolute paths, and relative to process.cwd()
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'test/**', // tape, common npm pattern
            'tests/**', // also common npm pattern
            'spec/**', // mocha, rspec-like pattern
            '**/__tests__/**', // jest pattern
            '**/__mocks__/**', // jest pattern
            '**/cypress/**', // cypress pattern
            'test.{js,jsx}', // repos with a single test file
            'test-*.{js,jsx}', // repos with multiple top-level test files
            '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
            '**/jest.config.js', // jest config
            '**/jest.setup.js', // jest setup
            '**/vue.config.js', // vue-cli config
            '**/webpack.config.js', // webpack config
            '**/webpack.config.*.js', // webpack config
            '**/rollup.config.js', // rollup config
            '**/rollup.config.*.js', // rollup config
            '**/gulpfile.js', // gulp config
            '**/gulpfile.*.js', // gulp config
            '**/.eslintrc.js', // eslint config
            '**/postcss.config.js', // postcss config
            '**/tailwind.config.{js,ts}', // tailwind config
            '**/vite.config.{js,ts}', // vite config
            '**/prettier.config.js', // prettier config
          ],
          optionalDependencies: false,
        },
      ],
    },
  };
}

function configurePrettier(previousConfig: ESLintConfig, options: Options): ESLintConfig {
  const config = { ...previousConfig };

  if (typeof config.extends === 'undefined') {
    config.extends = [];
  }

  if (typeof config.extends === 'string') {
    config.extends = [config.extends];
  }

  config.extends.push('prettier');
  if (options.vue) {
    config.extends.push('prettier/vue');
  }
  if (options.typescript) {
    config.extends.push('prettier/@typescript-eslint');
  }
  config.plugins = (config.plugins || []).concat('prettier');
  config.rules = {
    ...(config.rules || {}),
    'prettier/prettier': 'error',
  };

  return config;
}

function runPlugin(name: string, previousConfig: ESLintConfig, options: Options): ESLintConfig {
  const pkgName = `@kocal/eslint-config-generator-plugin-${name}`;

  if (!isPackageInstalled(pkgName)) {
    throw new Error(`Package "${pkgName}" is missing in your dependencies.`);
  }

  const pluginRequire: PluginCallback & { default: PluginCallback } = require(pkgName); // eslint-disable-line import/no-dynamic-require
  const plugin: PluginCallback = typeof pluginRequire.default === 'function' ? pluginRequire.default : pluginRequire;

  return plugin({ config: { ...previousConfig }, options });
}

export function generateConfig(userOptions: UserOptions = {}): ESLintConfig {
  const options = normalizeUserOptions(userOptions);
  let config = getBaseConfig(options);

  if (options.vue) {
    config = runPlugin('vue', config, options);
  }

  if (options.typescript) {
    config = runPlugin('typescript', config, options);
  }

  config = configurePrettier(config, options);

  return config;
}
