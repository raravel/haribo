const typescript = require( "@rollup/plugin-typescript");
//const typescript = require( "rollup-plugin-typescript2");
const peerDepsExternal = require( "rollup-plugin-peer-deps-external");
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');


module.exports = {
	input: "./src/index.ts", // 진입 경로
	output: {
		file: "./dist/index.js", // 출력 경로
		format: "es", // 출력 형식
		sourcemap: true, // 소스 맵을 켜놔서 디버깅을 쉽게 만들자
	},
	plugins: [
		peerDepsExternal(),
		json(),
		resolve(),
		typescript(),
		commonjs({
			include: /node_modules/,
			extensions: ['.ts', '.js'],
		}),
	],
};