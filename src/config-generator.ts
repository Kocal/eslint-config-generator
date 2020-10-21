import { Linter } from 'eslint';
import { normalizeUserOptions, Options, UserOptions } from './options';

export type ESLintConfig = Linter.Config & {
  extends?: string[],
  parserOptions: Linter.ParserOptions;
};

export function generateConfig(userOptions: UserOptions = {}): ESLintConfig {
  const options = normalizeUserOptions(userOptions);
  const config = getBaseConfig(options);

  applyVueConfig(config, options);
  applyTypeScriptConfig(config, options);
  applyPrettierConfig(config, options);

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
  if (options.typescript) {
    config.extends.push(require.resolve('eslint-config-prettier/@typescript-eslint'));
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

function applyTypeScriptConfig(config: ESLintConfig, options: Options): void {
  if (options.typescript === false) {
    return;
  }

  config.extends?.push(require.resolve('@typescript-eslint/eslint-plugin/dist/configs/eslint-recommended'));
  config.extends?.push(require.resolve('@typescript-eslint/eslint-plugin/dist/configs/recommended'));

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
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'], leadingUnderscore: 'allow', trailingUnderscore: 'allow' },
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'property', format: ['camelCase', 'snake_case', 'PascalCase'] }
    ]
  };

  config.overrides = (config.overrides || []).concat(
    {
      files: ['*.js', '*.jsx'].concat(options.typescript.vueComponents ? [] : ['*.vue']),
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      }
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off',
        'camelcase': 'off'
      },
    },
  );
}
