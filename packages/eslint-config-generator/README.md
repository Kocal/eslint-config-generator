# ESLint config generator

[![](https://img.shields.io/npm/v/@kocal/eslint-config-generator)](https://npmjs.org/package/@kocal/eslint-config-generator)

## Installation

```bash
$ yarn add --dev @kocal/eslint-config-generator eslint@^8.0.0 @babel/eslint-parser@^7.16.0
```

## Usage

In your `.eslintrc.js`:

```js
const { generateConfig } = require('@kocal/eslint-config-generator');

module.exports = generateConfig();
```
