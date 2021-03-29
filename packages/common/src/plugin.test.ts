import { createPlugin, ESLintConfig, normalizeUserOptions, Options } from '../dist';

describe('Plugin', () => {
  describe('createPlugin()', function () {
    it('should create a plugin', function () {
      const plugin = createPlugin(
        ({ config, options }: { config: ESLintConfig; options: Options }): ESLintConfig => {
          config.extends = ['foo-bar'];

          if (options.vue) {
            config.extends.push('vue-support');
          }

          return config;
        }
      );

      const config = plugin({
        config: { parserOptions: {} },
        options: normalizeUserOptions({}),
      });

      expect(config).toEqual({
        parserOptions: {},
        extends: ['foo-bar'],
      });
    });
  });
});
