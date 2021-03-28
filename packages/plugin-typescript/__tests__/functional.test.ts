import { generateConfig } from '@kocal/eslint-config-generator';
import { ESLint } from 'eslint';
import * as path from 'path';

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
  return lintCode(code, { filePath: 'file.ts' });
}

async function lintTypeScriptDefinitionCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'file.d.ts' });
}

async function lintTypeScriptJSXDefinitionCode(code: string): Promise<ESLint.LintResult[]> {
  return lintCode(code, { filePath: 'file.tsx' });
}

describe('Functional', function () {
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

  it('should lint TSX code', async function () {
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
