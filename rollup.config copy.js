// rollup.config.js
const nodeResolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const clear = require("rollup-plugin-clear");
const typescript = require("@rollup/plugin-typescript");
const babel = require("@rollup/plugin-babel");

module.exports = {
  input: "./src/index.ts",
  output: [
    {
      format: "cjs",
      file: "./dist/index.cjs.js",
      sourcemap: true,
    },
    {
      format: "umd",
      // 全局变量命名
      name: "rollup",
      exports: "Watermark",
      file: "./dist/index.umd.js",
      globals: {},
      sourcemap: true,
    },
    {
      format: "es",
      file: "./dist/index.esm.js",
      sourcemap: true,
    },
  ],
  plugins: [
    clear({
      targets: ["./dist/*"],
      watch: true,
    }),
    nodeResolve(),
    commonjs({ extensions: [".js", ".ts"] }),
    typescript({
      tsconfig: "./tsconfig.json",
      include: ["src/**/*.ts"],
      exclude: ["node_modules/**/*"],
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      include: ["src/**/*.js", "src/**/*.ts"],
      exclude: "node_modules/**",
    }),
  ],
};
