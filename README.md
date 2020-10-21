# ESLint config generator

![Test](https://github.com/Yproximite/eslint-config-generator/workflows/Test/badge.svg)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/yproximite/eslint-config-generator)

ESLint config generator for our internal and public projects. Allows to configure Vue, TypeScript, Prettier, ... plugins.

## Features

- Use [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
- Configure Prettier with [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

## Installation

This package is hosted on [GitHub Packages](https://github.com/features/packages), so you must tell to npm/yarn where to download it.
Please read [Authenticating to GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages).

You can run `npm login --registry=https://npm.pkg.github.com --scope=@yproximite` **or** create a `.npmrc` file with the following content:
```
@yproximite:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=<access token>
```

Then run: 
```bash
$ yarn add --dev @yproximite/eslint-config-generator eslint@^7.0.0 @babel/eslint-parser@^7.0.0 prettier@^2.0.0
```

## Usage

In your `.eslintrc.js`:

```js
const { generateConfig } = require('@yproximite/eslint-config-generator');

module.exports = generateConfig({
  vue: true, 
  typescript: true,
});
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
