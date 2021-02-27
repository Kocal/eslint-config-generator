import { normalizeUserOptions, Options, UserOptions } from '../dist';

describe('Options', function () {
  describe('Normalize user options', function () {
    it('should normalize user options', function () {
      const userOptions: UserOptions = {};
      const expectedOptions: Options = {
        root: true,
        knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
        vue: false,
        typescript: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    it('should normalize user options and disable "root"', function () {
      const userOptions: UserOptions = {
        root: false,
      };
      const expectedOptions: Options = {
        root: false,
        knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
        vue: false,
        typescript: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    it('should normalize user options with configured known extensions', function () {
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

    describe('Vue', () => {
      it('should enable Vue support by using "true"', function () {
        const userOptions: UserOptions = {
          vue: true,
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
          vue: {
            version: 2,
            config: 'recommended',
          },
          typescript: false,
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      it('should enable Vue support and specify version "3"', function () {
        const userOptions: UserOptions = {
          vue: {
            version: 3,
          },
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
          vue: {
            version: 3,
            config: 'recommended',
          },
          typescript: false,
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      it('should enable Vue support and specify config "essential"', function () {
        const userOptions: UserOptions = {
          vue: {
            config: 'essential',
          },
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
          vue: {
            version: 2,
            config: 'essential',
          },
          typescript: false,
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });
    });

    describe('TypeScript', () => {
      it('should enable TypeScript support by using "true"', function () {
        const userOptions: UserOptions = {
          typescript: true,
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
          vue: false,
          typescript: {
            vueComponents: false,
          },
        };

        expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
      });

      it('should enable TypeScript support and TypeScript on .vue files support if Vue support is enabled', function () {
        const userOptions: UserOptions = {
          vue: true,
          typescript: true,
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
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

      it('should enable TypeScript support but disable TypeScript on .vue files', function () {
        const userOptions: UserOptions = {
          vue: true,
          typescript: {
            vueComponents: false,
          },
        };
        const expectedOptions: Options = {
          root: true,
          knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
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
