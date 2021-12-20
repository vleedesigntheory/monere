const minimist = require('minimist');
const execa = require('execa');
const { fuzzyMatchTarget } = require('./utils');

const args = minimist(process.argv.slice(2));

// 获取执行命令
const target = args._.length ? fuzzyMatchTarget(args._)[0] : 'monere';
const formats = args.f || args.formats;
const sourcemap = args.s || args.sourcemap;

console.log('args', target, formats, sourcemap);

execa('rollup', [
    '-wc', // --watch --config
    '--environment',
    [
        `TARGET:${target}`,
        `FORMATS:${formats || 'cjs'}`,
        sourcemap ? `SOURCE_MAP:true` : ``
    ].filter(Boolean).join(',')
], {
    stdio: 'inherit' // 这个子进程的输出是在我们当前命令行中输出的
})