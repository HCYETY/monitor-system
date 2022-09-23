import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: "./src/index.ts",
  output: [
    // 1.cjs -> commonjs
    // 2.esm
    {
      format: "cjs",
      file: pkg.main,
      sourcemap: true
    },
    {
      format: "es",
      file: pkg.module,
      sourcemap: true
    },
  ],
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    sourceMaps()
  ]
}
