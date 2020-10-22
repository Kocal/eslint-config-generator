import { normalizeUserOptions, Options, UserOptions } from '../dist';

describe('options', function () {
  describe('normalizeUserOptions', function () {
    test('defaults', function () {
      const userOptions: UserOptions = {};
      const expectedOptions: Options = {
        root: true,
        knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        vue: false,
        typescript: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    test('with root disabled', function () {
      const userOptions: UserOptions = {
        root: false,
      };
      const expectedOptions: Options = {
        root: false,
        knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        vue: false,
        typescript: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    test('with different known extensions', function () {
      const userOptions: UserOptions = {
        knownExtensions: ['.js', '.jsx', '.css'],
      };
      const expectedOptions: Options = {
        root: true,
        knownExtensions: ['.js', '.jsx', '.css'],
        vue: false,
        typescript: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    describe('with Vue support', () => {
      test('boolean', function () {
        const userOptions: UserOptions = {
          vue: true,
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 2,
            config: 'recommended',
          },
          typescript: false,
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      test('custom version', function () {
        const userOptions: UserOptions = {
          vue: {
            version: 3,
          },
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 3,
            config: 'recommended',
          },
          typescript: false,
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      test('custom config', function () {
        const userOptions: UserOptions = {
          vue: {
            config: 'essential',
          },
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 2,
            config: 'essential',
          },
          typescript: false,
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });
    });

    describe('with TypeScript support', () => {
      test('boolean', function () {
        const userOptions: UserOptions = {
          typescript: true,
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: false,
          typescript: {
            vueComponents: false,
          },
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      test('with Vue (auto)', function () {
        const userOptions: UserOptions = {
          vue: true,
          typescript: true,
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 2,
            config: 'recommended',
          },
          typescript: {
            vueComponents: true,
          },
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      test('without Vue (disabled)', function () {
        const userOptions: UserOptions = {
          vue: true,
          typescript: {
            vueComponents: false,
          },
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 2,
            config: 'recommended',
          },
          typescript: {
            vueComponents: false,
          },
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });
    });
  });
});
