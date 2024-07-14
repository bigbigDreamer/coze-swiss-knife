import { defineConfig } from "rollup";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import gDts from '../../rollup-plugin/rollup-plugin-dts.mjs'
import swc from '@rollup/plugin-swc';




export  default defineConfig({
    input: "./src/index.ts",
    output: {
        file: './lib/bundle.js',
        format: 'es',
    },
    plugins: [
        resolve({ extensions: ['.ts'] }),
        gDts(),
        commonjs(),
        swc(),
    ],
})
