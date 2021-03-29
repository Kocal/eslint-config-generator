# ESLint config generator (plugin Vue)

[![](https://img.shields.io/npm/v/@kocal/eslint-config-generator-plugin-vue)](https://npmjs.org/package/@kocal/eslint-config-generator-plugin-vue)

## Installation

Install the plugin:
```shell
$ yarn add --dev @kocal/eslint-config-generator-plugin-vue
```

## Usage 

In your `.eslintrc.js`:
```js
// enable Vue support
generateConfig({
  vue: true
});

// enable and configure Vue support
generateConfig({
  vue: {
    version: 3, // default: 2
    config: 'recommended', // default: 'recommended', available values: 'essential', 'recommended', 'strongly-recommended'
  }
});
```
