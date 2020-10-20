import { normalizeUserOptions, Options, UserOptions } from './options';

export type ESLintConfig = import('eslint').Linter.Config & {
  extends?: string[]
};

export function generateConfig(userOptions: UserOptions = {}): ESLintConfig {
  const options = normalizeUserOptions(userOptions);
  const config = getBaseConfig();

  applyPrettierConfig(config, options);
  applyVueConfig(config, options);

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
  if(options.vue === false) {
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
