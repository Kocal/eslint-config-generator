import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

const externalDeps = Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies));
const nodeDeps = [];

export default {
  input: './src/index.ts',
  external: externalDeps.concat(nodeDeps),
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    babel({
      extensions: ['.js', '.ts'],
      babelHelpers: 'bundled',
    }),
  ],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'esm' },
  ],
};
