import type { Plugin } from 'vite'
import * as path from 'path'
import { readFileSync } from 'fs'

export default function dts(): Plugin {
    return {
        name: 'vite:dts',
        apply: 'build',
        async configResolved(config: any) {
            const { logger } = config
            const { outDir } = config.build

            const { entry, formats = ['es'] } = config.build.lib || {}
            if (!entry) {
                return logger.warn(
                    `[vite-dts] Expected "build.lib.entry" to exist in vite config`
                )
            }

            const pkgData = await readFileSync(path.join(config.root, 'package.json'), 'utf-8')
            const pkg = JSON.parse(pkgData)

            if (!pkg.main && formats.includes('cjs')) {
                return logger.warn(
                    `[vite-dts] Expected "main" to exist in package.json`
                )
            }
            if (!pkg.module && formats.includes('es')) {
                return logger.warn(
                    `[vite-dts] Expected "module" to exist in package.json`
                )
            }

            const entryPath = path.resolve(config.root, entry)
            const entryImportPath = path.relative(
                path.resolve(config.root, outDir),
                entryPath.replace(/\.tsx?$/, '')
            )

            const posixEntryImportPath = entryImportPath.split(path.sep).join(path.posix.sep)

            const entryImpl = readFileSync(entryPath, 'utf8')
            const hasDefaultExport =
                /^(export default |export \{[^}]+? as default\s*[,}])/m.test(entryImpl)

            const dtsModule =
                `export * from "${posixEntryImportPath}"` +
                (hasDefaultExport ? `\nexport {default} from "${posixEntryImportPath}"` : ``)

            const cjsModulePath = path.relative(outDir, pkg.main)
            const esModulePath = path.relative(outDir, pkg.module)

            //@ts-ignore
            this.generateBundle = function ({ entryFileNames }) {
                if (entryFileNames == cjsModulePath) {
                    this.emitFile({
                        type: 'asset',
                        fileName: cjsModulePath
                            .replace(/\.js$/, '.d.ts')
                            .replace(/\.cjs$/, '.d.ts'),
                        source: dtsModule,
                    })
                } else if (entryFileNames == esModulePath) {
                    this.emitFile({
                        type: 'asset',
                        fileName: esModulePath
                            .replace(/\.js$/, '.d.ts')
                            .replace(/\.mjs$/, '.d.ts'),
                        source: dtsModule,
                    })
                }
            }
        },
    }
}
