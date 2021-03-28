import { generateConfig, UserOptions } from '@kocal/eslint-config-generator';

describe('Config generator', () => {
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
        },
      },
    ]);
  });
});
