/* eslint-disable no-undef */
import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import esbuild, { minify } from 'rollup-plugin-esbuild';

const plugins = [
  nodeResolve({
    preferBuiltins: true,
    browser: true,
    mainFields: ['browser', 'jsnext', 'module', 'main'],
  }),
  commonjs(),
  alias({
    customResolver: nodeResolve({ extensions: ['.tsx', '.ts'] }),
  }),
  esbuild({
    // All options are optional
    include: /\.[jt]sx?$/, // default, inferred from `loaders` option
    exclude: /node_modules/, // default
    sourceMap: false, // by default inferred from rollup's `output.sourcemap` option
    minify: process.env.NODE_ENV === 'production',
    target: 'es2017', // default, or 'es20XX', 'esnext'
    jsx: 'transform', // default, or 'preserve'
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Like @rollup/plugin-replace
    define: {
      __VERSION__: '"x.y.z"',
    },
    tsconfig: 'tsconfig.json', // default
    // Add extra loaders
    loaders: {
      // Add .json files support
      // require @rollup/plugin-commonjs
      '.json': 'json',
      // Enable JSX in .js files too
      '.js': 'jsx',
    },
  }),
];

const bundleConfig = {
  input: 'src/index.tsx',
  output: {
    format: 'iife',
    sourcemap: true,
    strict: false,
  },
  context: 'window',
  plugins: [...plugins],
  external: ['react', 'react-dom'],
};

export default [
  {
    ...bundleConfig,
    output: {
      ...bundleConfig.output,
      file: 'dist/bundle.js',
    },
  },
  {
    ...bundleConfig,
    output: {
      ...bundleConfig.output,
      format: 'amd',
      file: 'dist/bundle.amd.js',
    },
  },

  {
    ...bundleConfig,
    output: {
      ...bundleConfig.output,
      file: 'dist/bundle.min.js',
    },
    plugins: [...bundleConfig.plugins, minify()],
  },
];
