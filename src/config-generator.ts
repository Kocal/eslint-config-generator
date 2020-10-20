import { normalizeUserOptions, Options, UserOptions } from './options';

export type ESLintConfig = import('eslint').Linter.Config & {
  extends?: string[]
};

export function generateConfig(userOptions: UserOptions = {}): ESLintConfig {
  const options = normalizeUserOptions(userOptions);
  const config = getBaseConfig(options);

  applyPrettierConfig(config, options);
  applyVueConfig(config, options);

  return config;
}

function getBaseConfig(options: Options): ESLintConfig {
  return {
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
    ],
    settings: {
      'import/resolver': {
        [require.resolve('eslint-import-resolver-node')]: {},
        [require.resolve('eslint-import-resolver-webpack')]: {}
      },
      'import/extensions': options.knownExtensions,
    },
    rules: {
      'semi': ['error', 'always'],
      'func-names': 'off',
      'no-param-reassign': ['error', {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
        ],
      }],
      // Import plugin
      'import/prefer-default-export': 'off',
      'import/extensions': ['error', 'always', options.knownExtensions.reduce((acc, knownExtension) => {
        acc[knownExtension.replace(/^./, '')] = 'never';
        return acc;
      }, {} as { [k: string]: 'never' })],
    }
  };
}

function applyPrettierConfig(config: ESLintConfig, options: Options): void {
  config.extends = (config.extends || []).concat(require.resolve('eslint-config-prettier'));
  if (options.vue) {
    config.extends.push(require.resolve('eslint-config-prettier/vue'));
  }
  config.plugins = (config.plugins || []).concat('prettier');
  config.rules = {
    ...config.rules || {},
    'prettier/prettier': 'error'
  };
}

function applyVueConfig(config: ESLintConfig, options: Options): void {
  if (options.vue === false) {
    return;
  }

  const pluginVueConfig = `${options.vue.version === 3 ? 'vue3-' : ''}` + options.vue.config;

  config.extends?.unshift(require.resolve(`eslint-plugin-vue/lib/configs/${pluginVueConfig}`));
  config.parser = 'vue-eslint-parser';
  config.rules = {
    ...config.rules || {},
    'vue/component-name-in-template-casing': [`error`, `PascalCase`, {
      'registeredComponentsOnly': false,
      'ignores': [],
    }],
    'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
  };
}
