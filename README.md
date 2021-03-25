# ESLint config generator

![Test](https://github.com/kocal/eslint-config-generator/workflows/CI/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/kocal/eslint-config-generator)

An opinionated ESLint config generator for my projects. Comes with AirBnB, Vue, TypeScript and Prettier support.

## Features

- Use [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
- Use Prettier with [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- Support Vue, with [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) with some opinionated rules
- Support TypeScript, with [@typescript-eslint/plugin-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/) with some opinionated rules

## Installation

```bash
$ yarn add --dev @kocal/eslint-config-generator eslint@^7.0.0 @babel/eslint-parser@^7.0.0 prettier@^2.0.0
```

## Usage

In your `.eslintrc.js`:

```js
const { generateConfig } = require('@kocal/eslint-config-generator');

module.exports = generateConfig();
```

### Vue 

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

### TypeScript

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

---

## How to contribute

You need to install some dependencies first:
```bash
$ yarn
```

### Contribution

- Make a pull request, its title should follows [Angular commit message convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-format)
- You should **Squash and Merge** your pull request

### Publishing a new release

This is automatically done by GitHub Actions and [semantic-release](https://github.com/semantic-release/semantic-release) when you merge a pull request.
