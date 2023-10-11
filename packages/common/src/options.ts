export interface UserOptions {
  root?: boolean;
  knownExtensions?: string[];
  vue?:
    | true
    | {
        version?: 2 | 3;
        config?: 'essential' | 'recommended' | 'strongly-recommended';
      };
  typescript?:
    | true
    | {
        vueComponents?: boolean;
      };
}

export interface Options {
  root: boolean;
  knownExtensions: string[];
  vue:
    | false
    | {
        version: 2 | 3;
        config: 'essential' | 'recommended' | 'strongly-recommended';
      };
  typescript:
    | false
    | {
        vueComponents: boolean;
      };
}

export function normalizeUserOptions(userOptions: UserOptions = {}): Options {
  const vueEnabled = userOptions.vue === true || typeof userOptions.vue === 'object';
  const options: Options = {
    root: typeof userOptions.root === 'undefined' ? true : userOptions.root,
    knownExtensions: userOptions.knownExtensions || ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'],
    vue:
      typeof userOptions.vue === 'undefined'
        ? false
        : {
          version:
              userOptions.vue === true || typeof userOptions.vue.version === 'undefined' ? 2 : userOptions.vue.version,
          config:
              userOptions.vue === true || typeof userOptions.vue.config === 'undefined'
                ? 'recommended'
                : userOptions.vue.config,
        },
    typescript:
      typeof userOptions.typescript === 'undefined'
        ? false
        : {
          vueComponents:
              userOptions.typescript === true || typeof userOptions.typescript.vueComponents === 'undefined'
                ? vueEnabled
                : userOptions.typescript.vueComponents,
        },
  };

  return options;
}
