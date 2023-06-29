import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';
import packageJSON from './package.json' assert { type: 'json' };

/**
 * Creates a predicate for external dependencies that need not be bundled.
 *
 * @param {string[]} deps The list of external dependencies
 * @returns The predicate function for testing external dependencies
 */
const isExternalPredicate = (deps) => {
  const externalPredicate = new RegExp(`node_modules/(${deps.join('|')})`);
  return (source) => externalPredicate.test(source);
};

/* eslint-disable import/no-anonymous-default-export */
/** @type {import('rollup').RollupOptions} */
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm'
  },
  plugins: [
    commonjs({
      include: /node_modules/
    }),
    css(),
    nodeResolve(),
    typescript({
      exclude: ['**/__stories__/*']
    })
  ],
  external: isExternalPredicate([
    ...Object.keys(packageJSON.peerDependencies)
  ])
};
