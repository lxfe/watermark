// rollup.config.js
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import clear from "rollup-plugin-clear";
import typescript from "@rollup/plugin-typescript";
import { babel } from "@rollup/plugin-babel";

export default {
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
      name: "Watermark",
      exports: "auto",
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
