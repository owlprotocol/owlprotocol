import { NodeResolvePlugin } from '@esbuild-plugins/node-resolve';
import * as glob from 'glob';
import * as esbuild from 'esbuild';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const files = glob.default.sync('src/**/*.{ts,tsx,json}');

const excludeNodeModulesPlugin = NodeResolvePlugin({
    extensions: ['.ts', '.js', '.json'],
    onResolved: (resolved) => {
        //console.debug(resolved)
        if (resolved.includes('node_modules')) {
            return {
                external: true,
            };
        }
        return resolved;
    },
});

const ESBUILD_WATCH = process.env.ESBUILD_WATCH === 'true' || process.env.ESBUILD_WATCH === '1';
const watch = ESBUILD_WATCH
    ? {
        onRebuild: (error) => {
            if (error) console.error('watch esbuild failed:', error);
            else console.log('watch esbuild succeeded');
        },
    }
    : false;

const external = ['url', 'events', 'path']
const inject = [] //['./react-shim.mjs']

export const baseConfig = {
    sourcemap: 'external',
    //platform: 'node', //'browser',
    target: ['es2020'],
    inject,
    plugins: [excludeNodeModulesPlugin],
    watch,
};

//CJS Library (Testing)
export const cjsLibConfig = {
    entryPoints: files,
    bundle: false,
    outdir: 'lib/cjs',
    //outExtension: { '.js': '.cjs' },
    format: 'cjs',
    ...baseConfig,
};

//ESM Library
export const esmLibConfig = {
    entryPoints: files,
    bundle: false,
    outdir: 'lib/esm',
    format: 'esm',
    ...baseConfig,
};

//CJS Bundle
export const cjsBundleConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false,
    outfile: 'dist/index.cjs',
    format: 'cjs',
    external,
    ...baseConfig,
};

export const cjsBundleMinConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outfile: 'dist/index.min.cjs',
    format: 'cjs',
    external,
    ...baseConfig,
};

//ESM Bundle
export const esmBundleConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: false,
    outfile: 'dist/index.mjs',
    format: 'esm',
    external,
    ...baseConfig,
};

export const esmBundleMinConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    outfile: 'dist/index.min.mjs',
    format: 'esm',
    external,
    ...baseConfig,
};

export const libConfigs = [cjsLibConfig, esmLibConfig]

export const distConfigs = [
    cjsBundleConfig,
    cjsBundleMinConfig,
    esmBundleConfig,
    esmBundleMinConfig
]

export const configs = [...libConfigs, ...distConfigs]

export const buildLib = async () => {
    const packagePromises = libConfigs.map(async (c) => {
        const dir = c.outdir;
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        const p = join(dir, 'package.json')
        if (!existsSync(p)) {
            const type = c.format === "esm" ? "module" : "commonjs"
            writeFileSync(p, JSON.stringify({ type }), "utf-8")
        }
    })
    const buildPromises = libConfigs.map((c) => esbuild.build(c))
    return Promise.all([...packagePromises, ...buildPromises])
}

export const buildDist = async () => {
    const promises = distConfigs.map((c) => esbuild.build(c))
    return Promise.all(promises)
}

export const buildAll = async () => {
    const promises = configs.map((c) => esbuild.build(c))
    return Promise.all(promises)
}
