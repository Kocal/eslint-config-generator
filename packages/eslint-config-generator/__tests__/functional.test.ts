import { ESLint } from 'eslint';
import * as path from 'path';
import { generateConfig } from '../dist';

let eslint: ESLint;

function createESLint(options: ESLint.Options): ESLint {
  return new ESLint({
    cwd: path.join(__dirname, 'fixtures'),
    ignore: false,
    ...options,
  });
}

async function lintCode(
  code: string,
  options?: { filePath?: string; warnIgnored?: boolean }
): Promise<ESLint.LintResult[]> {
  return eslint.lintText(code, options);
}

async function lintTypeScriptCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'MyComponent.ts' });
}

async function lintTypeScriptDefinitionCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'MyComponent.d.ts' });
}

async function lintTypeScriptJSXDefinitionCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'MyComponent.tsx' });
}

async function lintVueCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'MyComponent.vue' });
}

function cleanResults(results: ESLint.LintResult[]) {
  return results.map((result) => {
    return {
      ...result,
      messages: result.messages.map(({ line, column, ruleId, message }) => {
        return { line, column, ruleId, message };
      }),
    };
  });
}

describe('Functional', function () {
  it('should lint by using the default configuration', async function () {
    eslint = createESLint({
      baseConfig: generateConfig(),
    });

    const results = cleanResults(await eslint.lintText(`console.log("Hello world!")`, { filePath: 'MyComponent.js' }));

    expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 1,
    "line": 1,
    "message": "Unexpected console statement.",
    "ruleId": "no-console",
  },
  Object {
    "column": 13,
    "line": 1,
    "message": "Strings must use singlequote.",
    "ruleId": "quotes",
  },
  Object {
    "column": 28,
    "line": 1,
    "message": "Newline required at end of file but not found.",
    "ruleId": "eol-last",
  },
  Object {
    "column": 28,
    "line": 1,
    "message": "Missing semicolon.",
    "ruleId": "semi",
  },
]
`);
  });

  describe('plugin: typescript', function () {
    it('should lint TypeScript code', async function () {
      eslint = createESLint({
        baseConfig: generateConfig({
          typescript: true,
        }),
      });

      const results = await lintTypeScriptCode(
        `const str: any = 'foo';
console.log(str)
`
      );

      expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 12,
    "endColumn": 15,
    "endLine": 1,
    "line": 1,
    "message": "Unexpected any. Specify a different type.",
    "messageId": "unexpectedAny",
    "nodeType": "TSAnyKeyword",
    "ruleId": "@typescript-eslint/no-explicit-any",
    "severity": 1,
    "suggestions": Array [
      Object {
        "desc": "Use \`unknown\` instead, this will force you to explicitly, and safely assert the type is correct.",
        "fix": Object {
          "range": Array [
            11,
            14,
          ],
          "text": "unknown",
        },
        "messageId": "suggestUnknown",
      },
      Object {
        "desc": "Use \`never\` instead, this is useful when instantiating generic type parameters that you don't need to know the type of.",
        "fix": Object {
          "range": Array [
            11,
            14,
          ],
          "text": "never",
        },
        "messageId": "suggestNever",
      },
    ],
  },
  Object {
    "column": 1,
    "endColumn": 12,
    "endLine": 2,
    "line": 2,
    "message": "Unexpected console statement.",
    "messageId": "unexpected",
    "nodeType": "MemberExpression",
    "ruleId": "no-console",
    "severity": 1,
  },
  Object {
    "column": 17,
    "endColumn": 1,
    "endLine": 3,
    "fix": Object {
      "range": Array [
        40,
        40,
      ],
      "text": ";",
    },
    "line": 2,
    "message": "Missing semicolon.",
    "messageId": "missingSemi",
    "nodeType": "ExpressionStatement",
    "ruleId": "semi",
    "severity": 2,
  },
]
`);
    });

    it('should lint TypeScript code and valide namings case', async function () {
      eslint = createESLint({
        baseConfig: generateConfig({
          typescript: true,
        }),
      });

      const results = await lintTypeScriptDefinitionCode(`declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production';
  }

  interface Process {
    env: ProcessEnv;
  }
}
`);

      expect(results[0].messages).toMatchInlineSnapshot(`Array []`);
    });

    it('should lint TSX code ', async function () {
      eslint = createESLint({
        baseConfig: generateConfig({
          typescript: true,
        }),
      });

      const results = await lintTypeScriptJSXDefinitionCode(`function HelloWorld() {
  return <div>Hello world!</div>;
}
`);

      expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 10,
    "endColumn": 20,
    "endLine": 1,
    "line": 1,
    "message": "'HelloWorld' is defined but never used.",
    "messageId": "unusedVar",
    "nodeType": "Identifier",
    "ruleId": "@typescript-eslint/no-unused-vars",
    "severity": 1,
  },
]
`);
    });
  });

  describe('plugin: vue', () => {
    it('should lint Vue code', async function () {
      eslint = createESLint({
        baseConfig: generateConfig({
          vue: true,
        }),
      });

      const results = cleanResults(await eslint.lintFiles('component.vue'));

      expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 5,
    "line": 4,
    "message": "Component name \\"transition\\" is not PascalCase.",
    "ruleId": "vue/component-name-in-template-casing",
  },
  Object {
    "column": 24,
    "line": 11,
    "message": "'name' should be on a new line.",
    "ruleId": "vue/max-attributes-per-line",
  },
  Object {
    "column": 28,
    "line": 15,
    "message": "Multiple spaces found before 'data'.",
    "ruleId": "vue/no-multi-spaces",
  },
  Object {
    "column": 5,
    "line": 20,
    "message": "Component name \\"v-component\\" is not PascalCase.",
    "ruleId": "vue/component-name-in-template-casing",
  },
  Object {
    "column": 5,
    "line": 32,
    "message": "Unexpected console statement.",
    "ruleId": "no-console",
  },
  Object {
    "column": 17,
    "line": 32,
    "message": "Strings must use singlequote.",
    "ruleId": "quotes",
  },
]
`);
    });

    it('should lint Vue code with TypeScript support on .vue files', async function () {
      eslint = createESLint({
        baseConfig: generateConfig({
          vue: true,
          typescript: {
            vueComponents: true,
          },
        }),
      });

      const results = cleanResults(await eslint.lintFiles('component-typescript.vue'));

      expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 5,
    "line": 4,
    "message": "Component name \\"transition\\" is not PascalCase.",
    "ruleId": "vue/component-name-in-template-casing",
  },
  Object {
    "column": 28,
    "line": 13,
    "message": "Multiple spaces found before 'data'.",
    "ruleId": "vue/no-multi-spaces",
  },
  Object {
    "column": 5,
    "line": 18,
    "message": "Component name \\"v-component\\" is not PascalCase.",
    "ruleId": "vue/component-name-in-template-casing",
  },
  Object {
    "column": 3,
    "line": 27,
    "message": "Type boolean trivially inferred from a boolean literal, remove type annotation.",
    "ruleId": "@typescript-eslint/no-inferrable-types",
  },
  Object {
    "column": 3,
    "line": 29,
    "message": "Expected 'this' to be used by class method 'mounted'.",
    "ruleId": "class-methods-use-this",
  },
  Object {
    "column": 5,
    "line": 30,
    "message": "Unexpected console statement.",
    "ruleId": "no-console",
  },
  Object {
    "column": 17,
    "line": 30,
    "message": "Strings must use singlequote.",
    "ruleId": "quotes",
  },
  Object {
    "column": 3,
    "line": 33,
    "message": "Expected 'this' to be used by class method 'onVisible'.",
    "ruleId": "class-methods-use-this",
  },
  Object {
    "column": 5,
    "line": 35,
    "message": "Unexpected console statement.",
    "ruleId": "no-console",
  },
]
`);
    });
  });

  describe('Specific rules', function () {
    describe('vue/no-bare-strings-in-template', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>Hello</div>
</template>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`Array []`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>
    {{ $t('hello') }}
  </div>
</template>
`);

        expect(results[0].messages).toEqual([]);
      });
    });

    describe('vue/no-duplicate-attr-inheritance', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>
    <MyComponent v-bind="$attrs" />
  </div>
</template>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 26,
    "endColumn": 32,
    "endLine": 3,
    "line": 3,
    "message": "Set \\"inheritAttrs\\" to false.",
    "nodeType": "Identifier",
    "ruleId": "vue/no-duplicate-attr-inheritance",
    "severity": 2,
  },
]
`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>
    <MyComponent v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>
`);

        expect(results[0].messages).toEqual([]);
      });
    });

    describe('vue/no-empty-component-block', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<style></style>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 1,
    "endColumn": 16,
    "endLine": 1,
    "line": 1,
    "message": "\`<style>\` is empty. Empty block is not allowed.",
    "messageId": "unexpected",
    "nodeType": "VElement",
    "ruleId": "vue/no-empty-component-block",
    "severity": 2,
  },
]
`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>
    <MyComponent />
  </div>
</template>
`);

        expect(results[0].messages).toEqual([]);
      });
    });

    describe('vue/no-template-target-blank', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <a href="https://example.com" target="_blank">{{ $t('example') }}</a>
</template>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 33,
    "endColumn": 48,
    "endLine": 2,
    "fix": Object {
      "range": Array [
        42,
        43,
      ],
      "text": "
",
    },
    "line": 2,
    "message": "'target' should be on a new line.",
    "nodeType": "VAttribute",
    "ruleId": "vue/max-attributes-per-line",
    "severity": 1,
  },
  Object {
    "column": 33,
    "endColumn": 48,
    "endLine": 2,
    "line": 2,
    "message": "Using target=\\"_blank\\" without rel=\\"noopener noreferrer\\" is a security risk.",
    "nodeType": "VAttribute",
    "ruleId": "vue/no-template-target-blank",
    "severity": 2,
  },
]
`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">{{ $t('example') }}</a>
</template>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 33,
    "endColumn": 48,
    "endLine": 2,
    "fix": Object {
      "range": Array [
        42,
        43,
      ],
      "text": "
",
    },
    "line": 2,
    "message": "'target' should be on a new line.",
    "nodeType": "VAttribute",
    "ruleId": "vue/max-attributes-per-line",
    "severity": 1,
  },
  Object {
    "column": 49,
    "endColumn": 74,
    "endLine": 2,
    "line": 2,
    "message": "'rel' should be on a new line.",
    "nodeType": "VAttribute",
    "ruleId": "vue/max-attributes-per-line",
    "severity": 1,
  },
]
`)
      });
    });

    describe('vue/padding-line-between-blocks', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>Hello world</div>
</template>
<script>
export default {};
</script>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 1,
    "endColumn": 10,
    "endLine": 6,
    "fix": Object {
      "range": Array [
        47,
        47,
      ],
      "text": "
",
    },
    "line": 4,
    "message": "Expected blank line before this block.",
    "messageId": "always",
    "nodeType": "VElement",
    "ruleId": "vue/padding-line-between-blocks",
    "severity": 2,
  },
]
`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>Hello world</div>
</template>

<script>
export default {};
</script>
`);

        expect(results[0].messages).toEqual([]);
      });
    });

    describe('vue/v-on-function-call', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>
    <button @click="closeModal()">Button</button>
  </div>
</template>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 21,
    "endColumn": 33,
    "endLine": 3,
    "fix": Object {
      "range": Array [
        39,
        51,
      ],
      "text": "closeModal",
    },
    "line": 3,
    "message": "Method calls without arguments inside of 'v-on' directives must not have parentheses.",
    "nodeType": "CallExpression",
    "ruleId": "vue/v-on-function-call",
    "severity": 2,
  },
  Object {
    "column": 35,
    "endColumn": 35,
    "endLine": 3,
    "fix": Object {
      "range": Array [
        53,
        53,
      ],
      "text": "
",
    },
    "line": 3,
    "message": "Expected 1 line break after opening tag (\`<button>\`), but no line breaks found.",
    "messageId": "unexpectedAfterClosingBracket",
    "nodeType": "HTMLTagClose",
    "ruleId": "vue/singleline-html-element-content-newline",
    "severity": 1,
  },
  Object {
    "column": 41,
    "endColumn": 41,
    "endLine": 3,
    "fix": Object {
      "range": Array [
        59,
        59,
      ],
      "text": "
",
    },
    "line": 3,
    "message": "Expected 1 line break before closing tag (\`</button>\`), but no line breaks found.",
    "messageId": "unexpectedBeforeOpeningBracket",
    "nodeType": "HTMLEndTagOpen",
    "ruleId": "vue/singleline-html-element-content-newline",
    "severity": 1,
  },
]
`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<template>
  <div>
    <button @click="closeModal">Button</button>
    <button @click="closeModal(args)">Button</button>
  </div>
</template>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 33,
    "endColumn": 33,
    "endLine": 3,
    "fix": Object {
      "range": Array [
        51,
        51,
      ],
      "text": "
",
    },
    "line": 3,
    "message": "Expected 1 line break after opening tag (\`<button>\`), but no line breaks found.",
    "messageId": "unexpectedAfterClosingBracket",
    "nodeType": "HTMLTagClose",
    "ruleId": "vue/singleline-html-element-content-newline",
    "severity": 1,
  },
  Object {
    "column": 39,
    "endColumn": 39,
    "endLine": 3,
    "fix": Object {
      "range": Array [
        57,
        57,
      ],
      "text": "
",
    },
    "line": 3,
    "message": "Expected 1 line break before closing tag (\`</button>\`), but no line breaks found.",
    "messageId": "unexpectedBeforeOpeningBracket",
    "nodeType": "HTMLEndTagOpen",
    "ruleId": "vue/singleline-html-element-content-newline",
    "severity": 1,
  },
  Object {
    "column": 39,
    "endColumn": 39,
    "endLine": 4,
    "fix": Object {
      "range": Array [
        105,
        105,
      ],
      "text": "
",
    },
    "line": 4,
    "message": "Expected 1 line break after opening tag (\`<button>\`), but no line breaks found.",
    "messageId": "unexpectedAfterClosingBracket",
    "nodeType": "HTMLTagClose",
    "ruleId": "vue/singleline-html-element-content-newline",
    "severity": 1,
  },
  Object {
    "column": 45,
    "endColumn": 45,
    "endLine": 4,
    "fix": Object {
      "range": Array [
        111,
        111,
      ],
      "text": "
",
    },
    "line": 4,
    "message": "Expected 1 line break before closing tag (\`</button>\`), but no line breaks found.",
    "messageId": "unexpectedBeforeOpeningBracket",
    "nodeType": "HTMLEndTagOpen",
    "ruleId": "vue/singleline-html-element-content-newline",
    "severity": 1,
  },
]
`);
      });
    });

    describe('vue/no-boolean-default', function () {
      it('should fail', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<script>
export default {
  props: {
    rounded: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
`);

        expect(results[0].messages).toMatchInlineSnapshot(`
Array [
  Object {
    "column": 16,
    "endColumn": 20,
    "endLine": 6,
    "line": 6,
    "message": "Boolean prop should not set a default (Vue defaults it to false).",
    "nodeType": "Literal",
    "ruleId": "vue/no-boolean-default",
    "severity": 2,
  },
]
`);
      });

      it('should pass', async function () {
        eslint = createESLint({
          baseConfig: generateConfig({
            vue: true,
          }),
        });

        const results = await lintVueCode(`<script>
export default {
  props: {
    rounded: {
      type: Boolean,
    },
  },
};
</script>
`);

        expect(results[0].messages).toEqual([]);
      });
    });
  });
});
