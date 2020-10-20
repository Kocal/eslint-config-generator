import { normalizeUserOptions, Options, UserOptions } from '../dist';

describe('options', function () {
  describe('normalizeUserOptions', function () {
    test('defaults', function () {
      const userOptions: UserOptions = {};
      const expectedOptions: Options = {
        knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
        vue: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    test('with different known extensions', function () {
      const userOptions: UserOptions = {
        knownExtensions: ['.js', '.jsx', '.css'],
      };
      const expectedOptions: Options = {
        knownExtensions: ['.js', '.jsx', '.css'],
        vue: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    describe('with Vue support', () => {
      test('boolean', function () {
        const userOptions: UserOptions = {
          vue: true
        };
        const expectedOptions: Options = {
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 2,
            config: 'recommended'
          }
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      test('custom version', function () {
        const userOptions: UserOptions = {
          vue: {
            version: 3
          }
        };
        const expectedOptions: Options = {
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 3,
            config: 'recommended'
          }
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      test('custom config', function () {
        const userOptions: UserOptions = {
          vue: {
            config: 'essential'
          }
        };
        const expectedOptions: Options = {
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
          vue: {
            version: 2,
            config: 'essential'
          }
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });
    });
  });
});
