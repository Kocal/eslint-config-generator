import { createPlugin, ESLintConfig, Options } from '@kocal/eslint-config-generator-common';

export default createPlugin(
  ({ config, options }: { config: ESLintConfig; options: Options }): ESLintConfig => {
    if (options.typescript === false) {
      return config;
    }

    config.extends?.push('plugin:@typescript-eslint/eslint-recommended');
    config.extends?.push('plugin:@typescript-eslint/recommended');

    if (options.vue) {
      config.parserOptions.parser = '@typescript-eslint/parser';
      config.parserOptions.extraFileExtensions = ['.vue'];
    } else {
      config.parser = '@typescript-eslint/parser';
    }

    config.rules = {
      ...config.rules,
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
        { selector: 'objectLiteralProperty', format: null },
      ],
      '@typescript-eslint/no-var-requires': 'off',
    };

    config.overrides = (config.overrides || []).concat(
      {
        files: ['*.js', '*.jsx'].concat(options.typescript.vueComponents ? [] : ['*.vue']),
        rules: {
          '@typescript-eslint/explicit-function-return-type': 'off',
          '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
      },
      {
        files: ['*.ts', '*.tsx'].concat(options.typescript.vueComponents ? ['*.vue'] : []),
        rules: {
          // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
          // does not work with type definitions
          'no-unused-vars': 'off',
          camelcase: 'off',
          'global-require': 'off',
          'no-use-before-define': 'off',
          'no-useless-constructor': 'off',
          'no-loop-func': 'off',
          'no-shadow': 'off',
        },
      }
    );

    return config;
  }
);
