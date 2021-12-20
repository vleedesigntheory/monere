const packageFormats = process.env.FORMATS && process.env.FORMATS.split(',');
const sourcemap = process.env.SOURCE_MAP;
const path = require('path');

// 根据target，找到需要打包的目录
const packagesDir = path.resolve(__dirname, 'packages');
const packageDir = path.resolve(packagesDir, process.env.TARGET);
const name = path.basename(packageDir);

const resolve = p => path.resolve(packageDir, p);

const pkg = require(resolve('package.json'));

console.log('pkg', pkg);

const outputConfig = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm.bundler.js`),
        format: 'es'
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    'global': {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife'
    },
}

console.log('outputConfig', outputConfig);

const packageConfigs = packageFormats || pkg.buildOptions.formats;

import ts from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'

function createConfig(format, output) {
    output.sourcemap = sourcemap;
    output.exports = `named`;
    let external = []; // 外部模块，不需要打包的模块
    if(format == 'global') {
        output.name = pkg.buildOptions.name;
    } else {
        if((pkg.dependencies)) external = [...Object.keys(pkg.dependencies)]
    }
    return {
        input: resolve(`src/index.ts`),
        output,
        external,
        plugins: [
            ts({
                tsConfigOverride: {
                    declaration: !!pkg.types
                }
            }),
            json(),
            commonjs(),
            nodeResolve()
        ]
    }
}

export default packageConfigs.map(format => createConfig(format, outputConfig[format]))

