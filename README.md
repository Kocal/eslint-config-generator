# ESLint config generator

![GitHub Actions: CI](https://github.com/kocal/eslint-config-generator/workflows/CI/badge.svg)
![GitHub Actions: Release](https://github.com/kocal/eslint-config-generator/workflows/Release/badge.svg)

An opinionated ESLint config generator for my projects. Comes with AirBnB, Vue, TypeScript and Prettier support.

| Package                                                                          | Version                                                                                                                                                          |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@kocal/eslint-config-generator](./packages/eslint-config-generator)             | [![](https://img.shields.io/npm/v/@kocal/eslint-config-generator)](https://npmjs.org/package/@kocal/eslint-config-generator)                                     |
| [@kocal/eslint-config-generator-common](./packages/common)                       | [![](https://img.shields.io/npm/v/@kocal/eslint-config-generator-common)](https://npmjs.org/package/@kocal/eslint-config-generator-common)                       |
| [@kocal/eslint-config-generator-plugin-typescript](./packages/plugin-typescript) | [![](https://img.shields.io/npm/v/@kocal/eslint-config-generator-plugin-typescript)](https://npmjs.org/package/@kocal/eslint-config-generator-plugin-typescript) |
| [@kocal/eslint-config-generator-plugin-vue](./packages/plugin-vue)               | [![](https://img.shields.io/npm/v/@kocal/eslint-config-generator-plugin-vue)](https://npmjs.org/package/@kocal/eslint-config-generator-plugin-vue)               |

## Features

- Use [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base)
- Use Prettier with [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- Support Vue, with [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) and some opinionated rules
- Support TypeScript, with [@typescript-eslint/plugin-eslint](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/) and some opinionated rules

## Installation and usage

Please read [the documentation](./packages/eslint-config-generator) to get started.

### Vue support

Read [Vue plugin's documentation](./packages/plugin-vue/README.md).

### TypeScript support

Read [TypeScript plugin's documentation](./packages/plugin-typescript/README.md).

---

## How to contribute

You need to install [Rush.js](https://rushjs.io/pages/intro/get_started/) first.

Then run:

```shell
$ rush install
$ rush build -v
```

### Testing

```shell
$ rush test -v
```

### Linting

```shell
$ rush lint
$ rush lint:fix
```

### Contribution

- Make a pull request, its title should follows [Angular commit message convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit-message-format)
- Rush `rush change` to describe your changes (they will be used to generate the CHANGELOG)

### Publishing a new release

This is automatically done by GitHub Actions and Rush when a pull request is merged.
