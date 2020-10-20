export interface UserOptions {
  knownExtensions?: string[],
  vue?: true | {
    version?: 2 | 3,
    config?: 'essential' | 'recommended' | 'strongly-recommended',
  }
}

export interface Options {
  knownExtensions: string[],
  vue: false | {
    version: 2 | 3,
    config: 'essential' | 'recommended' | 'strongly-recommended',
  }
}

export function normalizeUserOptions(userOptions: UserOptions = {}): Options {
  const options: Options = {
    knownExtensions: userOptions.knownExtensions || ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
    vue: typeof userOptions.vue === 'undefined' ? false : {
      version: (userOptions.vue === true || typeof userOptions.vue.version === 'undefined') ? 2 : userOptions.vue.version,
      config: (userOptions.vue === true || typeof userOptions.vue.config === 'undefined') ? 'recommended' : userOptions.vue.config,
    }
  };

  return options;
}
