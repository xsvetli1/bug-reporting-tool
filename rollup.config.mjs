import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import replace from 'rollup-plugin-replace';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/cjs/index.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/esm/index.js',
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            json()
        ]
    },
    {
        input: 'dist/esm/types/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
        external: [/\.css$/]
    },
    {
        input: 'src/widget.tsx',
        output: [
            {
                file: 'dist/iife/index.js',
                format: 'iife',
                sourcemap: true
            }
        ],
        plugins: [
            resolve(),
            commonjs(),
            typescript({ tsconfig: './tsconfig.json' }),
            postcss(),
            json(),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]
    }
];
