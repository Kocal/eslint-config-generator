import { Linter } from 'eslint';
import { normalizeUserOptions, Options, UserOptions } from './options';

export type ESLintConfig = Linter.Config & {
  extends?: string[];
  parserOptions: Linter.ParserOptions;
};

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
    },
  };
}

function configurePrettier(previousConfig: ESLintConfig, options: Options): ESLintConfig {
  const config = { ...previousConfig };

  config.extends = (config.extends || []).concat('prettier');
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

function configureVue(previousConfig: ESLintConfig, options: Options): ESLintConfig {
  const config = { ...previousConfig };

  if (options.vue === false) {
    return config;
  }

  const pluginVueConfig = `${options.vue.version === 3 ? 'vue3-' : ''}${options.vue.config}`;

  config.extends?.unshift(`plugin:vue/${pluginVueConfig}`);
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
    'vue/html-self-closing': ['error'],
    'vue/no-bare-strings-in-template': ['error'],
    'vue/no-duplicate-attr-inheritance': ['error'],
    'vue/no-empty-component-block': ['error'],
  };

  return config;
}

function configureTypeScript(previousConfig: ESLintConfig, options: Options): ESLintConfig {
  const config = { ...previousConfig };

  if (options.typescript === false) {
    return config;
  }

  config.extends?.push('plugin:@typescript-eslint/eslint-recommended');
  config.extends?.push('plugin:@typescript-eslint/recommended');

  if (options.vue) {
    config.parserOptions.parser = '@typescript-eslint/parser';
  } else {
    config.parser = '@typescript-eslint/parser';
  }

  if (options.typescript.vueComponents) {
    config.parserOptions.extraFileExtensions = ['.vue'];
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
      { selector: 'property', format: ['camelCase', 'snake_case', 'PascalCase'] },
    ],
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
      },
    }
  );

  return config;
}

export function generateConfig(userOptions: UserOptions = {}): ESLintConfig {
  const options = normalizeUserOptions(userOptions);

  let config = getBaseConfig(options);
  config = configureVue(config, options);
  config = configureTypeScript(config, options);
  config = configurePrettier(config, options);

  return config;
}
