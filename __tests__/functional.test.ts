import { ESLint } from 'eslint';
import * as path from 'path';
import { generateConfig } from '../dist';

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

describe('functional', function () {
  test('basic lint', async function () {
    const eslint = createESLint({
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

  describe('Vue', function () {
    test('basic lint', async function () {
      const eslint = createESLint({
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
            "column": 29,
            "line": 5,
            "message": "Replace \`⏎········my·image:·<img·src=\\"https://example.com/image.png\\"·/>⏎······\` with \`my·image:·<img·src=\\"https://example.com/image.png\\"·/>\`",
            "ruleId": "prettier/prettier",
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
        ]
      `);
    });

    test('with TypeScript components', async function () {
      const eslint = createESLint({
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
            "column": 29,
            "line": 5,
            "message": "Replace \`⏎········my·image:·<img·src=\\"https://example.com/image.png\\"·/>⏎······\` with \`my·image:·<img·src=\\"https://example.com/image.png\\"·/>\`",
            "ruleId": "prettier/prettier",
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
  });

  describe('TypeScript', function () {
    test('basic lint', async function () {
      const eslint = createESLint({
        baseConfig: generateConfig({
          typescript: true,
        }),
      });

      const results = cleanResults(
        await eslint.lintText(
          `const str: any = 'foo'
console.log(str)      
`,
          { filePath: 'file.ts' }
        )
      );

      expect(results[0].messages).toMatchInlineSnapshot(`
        Array [
          Object {
            "column": 12,
            "line": 1,
            "message": "Unexpected any. Specify a different type.",
            "ruleId": "@typescript-eslint/no-explicit-any",
          },
          Object {
            "column": 23,
            "line": 1,
            "message": "Insert \`;\`",
            "ruleId": "prettier/prettier",
          },
          Object {
            "column": 23,
            "line": 1,
            "message": "Missing semicolon.",
            "ruleId": "semi",
          },
          Object {
            "column": 1,
            "line": 2,
            "message": "Unexpected console statement.",
            "ruleId": "no-console",
          },
          Object {
            "column": 17,
            "line": 2,
            "message": "Replace \`······\` with \`;\`",
            "ruleId": "prettier/prettier",
          },
          Object {
            "column": 17,
            "line": 2,
            "message": "Missing semicolon.",
            "ruleId": "semi",
          },
        ]
      `);
    });
  });
});
