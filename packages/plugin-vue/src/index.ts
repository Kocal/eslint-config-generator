import { createPlugin, ESLintConfig, Options } from '@kocal/eslint-config-generator-common';

export default createPlugin(
  ({ config, options }: { config: ESLintConfig; options: Options }): ESLintConfig => {
    if (options.vue === false) {
      return config;
    }

    const pluginVueConfig = `${options.vue.version === 3 ? 'vue3-' : ''}${options.vue.config}`;

    config.extends?.unshift(`plugin:vue/${pluginVueConfig}`);
    config.parserOptions = {
      ...config.parserOptions,
      parser: config.parser,
    };
    config.parser = 'vue-eslint-parser';
    config.rules = {
      ...(config.rules || {}),
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
    };

    return config;
  }
);
