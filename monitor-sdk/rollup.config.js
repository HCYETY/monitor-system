import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
export default {
  input: "./src/index.ts",
  output: [
    // 1.cjs -> commonjs
    // 2.esm
    {
      format: "cjs",
      file: pkg.main,
      sourceMap: true
    },
    {
      format: "es",
      file: pkg.module,
      sourcemap: true
    },
  ],
  plugins: [typescript({
    sourceMap: true
  })]
}