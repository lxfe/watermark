import typescript  from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import clear from 'rollup-plugin-clear';

/**@type {import('rollup').RollupOptions} */
const tasks = [];

export default {
	input: 'src/index.ts',
  // external: ['lodash'],
  // globals:{
  //   lodash: 'lodash',
  // },
	output:[
		{
			file: 'dist/index.esm.js',
			format: 'esm',
		},
		 {
			file: 'dist/index.umd.js',
			format: 'umd',
			name: 'TestPackage',
			interop: 'auto',
		},{
			file: 'dist/index.iife.js',
			format: 'iife',
			name: 'TestPackage',
		},{
			file: 'dist/index.cjs.js',
			format: 'cjs',
		}
	],
	plugins:[clear({ targets: ['dist'] }), typescript(), resolve(),commonjs(), terser() ]
}