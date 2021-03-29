# ESLint config generator (plugin TypeScript)

[![](https://img.shields.io/npm/v/@kocal/eslint-config-generator-plugin-typescript)](https://npmjs.org/package/@kocal/eslint-config-generator-plugin-typescript)

## Installation

Install the plugin:
```shell
$ yarn add --dev @kocal/eslint-config-generator-plugin-typescript
```

## Usage 

In your `.eslintrc.js`:
```js
// enable TypeScript support
generateConfig({
  typescript: true
});

// enable and configure TypeScript support
generateConfig({
  typescript: {
    vueComponents: true, // allow to lint .vue files, enabled by default if Vue support is enabled 
  }
});
```
