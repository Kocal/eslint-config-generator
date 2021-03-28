import { Linter } from 'eslint';

export type ESLintConfig = Linter.Config & {
  extends?: string[];
  parserOptions: Linter.ParserOptions;
};
