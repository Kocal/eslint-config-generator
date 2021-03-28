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
});
