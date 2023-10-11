import { normalizeUserOptions, Options, UserOptions } from '../dist';

describe('Options', () => {
  describe('Normalize user options', () => {
    it('should normalize user options', () => {
      const userOptions: UserOptions = {};
      const expectedOptions: Options = {
        root: true,
        knownExtensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
        vue: false,
        typescript: false,
      };

      expect(normalizeUserOptions(userOptions)).toEqual(expectedOptions);
    });

    it('should normalize user options and disable "root"', () => {
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

    it('should normalize user options with configured known extensions', () => {
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
      it('should enable Vue support by using "true"', () => {
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

      it('should enable Vue support and specify version "3"', () => {
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

      it('should enable Vue support and specify config "essential"', () => {
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
      it('should enable TypeScript support by using "true"', () => {
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

      it('should enable TypeScript support and TypeScript on .vue files support if Vue support is enabled', () => {
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

      it('should enable TypeScript support but disable TypeScript on .vue files', () => {
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
