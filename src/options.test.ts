import { normalizeUserOptions, Options, UserOptions } from '../dist';

describe('options', function () {
  describe('normalizeUserOptions', function () {
    test('defaults', function () {
      expect(normalizeUserOptions()).toEqual({
        vue: false
      });
    });

    describe('with Vue support', () => {
      test('boolean', function () {
        const userOptions: UserOptions = {
          vue: true
        };
        const expectedOptions: Options = {
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
