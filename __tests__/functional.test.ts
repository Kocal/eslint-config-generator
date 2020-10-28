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

async function lintCode(
  code: string,
  options?: { filePath?: string; warnIgnored?: boolean }
): Promise<ESLint.LintResult[]> {
  return eslint.lintText(code, options);
}

async function lintTypeScriptCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'file.ts' });
}

async function lintVueCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'file.vue' });
}

describe('Functional', function () {
  it('should lint by using the default configuration', async function () {
    eslint = createESLint({
      baseConfig: generateConfig(),
    });

    const results = cleanResults(await eslint.lintText(`console.log("Hello world!")`, { filePath: 'file.js' }));

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
          "message": "Replace \`\\"Hello·world!\\")\` with \`'Hello·world!');⏎\`",
          "ruleId": "prettier/prettier",
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
            "column": 8,
            "line": 2,
            "message": "Unexpected non-translated string used.",
            "ruleId": "vue/no-bare-strings-in-template",
          },
          Object {
            "column": 5,
            "line": 4,
            "message": "Component name \\"transition\\" is not PascalCase.",
            "ruleId": "vue/component-name-in-template-casing",
          },
          Object {
            "column": 29,
            "line": 5,
            "message": "Unexpected non-translated string used.",
            "ruleId": "vue/no-bare-strings-in-template",
          },
          Object {
            "column": 9,
            "line": 7,
            "message": "Disallow self-closing on HTML void elements (<img/>).",
            "ruleId": "vue/html-self-closing",
          },
          Object {
            "column": 29,
            "line": 14,
            "message": "Delete \`·\`",
            "ruleId": "prettier/prettier",
          },
          Object {
            "column": 5,
            "line": 19,
            "message": "Component name \\"v-component\\" is not PascalCase.",
            "ruleId": "vue/component-name-in-template-casing",
          },
          Object {
            "column": 18,
            "line": 19,
            "message": "Unexpected non-translated string used.",
            "ruleId": "vue/no-bare-strings-in-template",
          },
          Object {
            "column": 5,
            "line": 31,
            "message": "Unexpected console statement.",
            "ruleId": "no-console",
          },
          Object {
            "column": 17,
            "line": 31,
            "message": "Replace \`\\"Hello·world!\\"\` with \`'Hello·world!'\`",
            "ruleId": "prettier/prettier",
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
            "column": 8,
            "line": 2,
            "message": "Unexpected non-translated string used.",
            "ruleId": "vue/no-bare-strings-in-template",
          },
          Object {
            "column": 5,
            "line": 4,
            "message": "Component name \\"transition\\" is not PascalCase.",
            "ruleId": "vue/component-name-in-template-casing",
          },
          Object {
            "column": 29,
            "line": 5,
            "message": "Replace \`⏎········my·image:·<img·src=\\"https://example.com/image.png\\"·/>⏎······\` with \`my·image:·<img·src=\\"https://example.com/image.png\\"·/>\`",
            "ruleId": "prettier/prettier",
          },
          Object {
            "column": 29,
            "line": 5,
            "message": "Unexpected non-translated string used.",
            "ruleId": "vue/no-bare-strings-in-template",
          },
          Object {
            "column": 19,
            "line": 6,
            "message": "Disallow self-closing on HTML void elements (<img/>).",
            "ruleId": "vue/html-self-closing",
          },
          Object {
            "column": 28,
            "line": 13,
            "message": "Delete \`·\`",
            "ruleId": "prettier/prettier",
          },
          Object {
            "column": 5,
            "line": 18,
            "message": "Component name \\"v-component\\" is not PascalCase.",
            "ruleId": "vue/component-name-in-template-casing",
          },
          Object {
            "column": 18,
            "line": 18,
            "message": "Unexpected non-translated string used.",
            "ruleId": "vue/no-bare-strings-in-template",
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
            "message": "Missing return type on function.",
            "ruleId": "@typescript-eslint/explicit-module-boundary-types",
          },
          Object {
            "column": 10,
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
            "message": "Replace \`\\"Hello·world!\\"\` with \`'Hello·world!'\`",
            "ruleId": "prettier/prettier",
          },
          Object {
            "column": 12,
            "line": 34,
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
          "endColumn": 17,
          "endLine": 2,
          "fix": Object {
            "range": Array [
              40,
              40,
            ],
            "text": ";",
          },
          "line": 2,
          "message": "Insert \`;\`",
          "nodeType": null,
          "ruleId": "prettier/prettier",
          "severity": 2,
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

  describe('Rule', function () {
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

        expect(results[0].messages).toMatchInlineSnapshot(`
          Array [
            Object {
              "column": 8,
              "endColumn": 13,
              "endLine": 2,
              "line": 2,
              "message": "Unexpected non-translated string used.",
              "messageId": "unexpected",
              "nodeType": "VText",
              "ruleId": "vue/no-bare-strings-in-template",
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
  });
});
