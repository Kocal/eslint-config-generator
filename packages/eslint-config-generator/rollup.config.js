import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json';

const externalDeps = Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies });
const nodeDeps = [];

export default {
  input: './src/index.ts',
  external: externalDeps.concat(nodeDeps),
  plugins: [
    nodeResolve({
      extensions: ['.js', '.ts'],
    }),
    babel({
      configFile: `${__dirname}/../../babel.config.js`,
      extensions: ['.js', '.ts'],
      babelHelpers: 'bundled',
    }),
  ],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'esm' },
  ],
};
