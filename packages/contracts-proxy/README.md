# Contracts Proxy

Proxy code for contracts.

## Dev
To start, copy `.env.example` to `.env`, and optionally use your own values

## package.json
Exports are defined as below
```json
{
  "type": "module",
  "main": "./lib/cjs/index.cjs",
  "module": "./lib/esm/index.mjs",
  "types": "./lib/types/index.d.ts",
  "exports": {
    ".": {
      "types": "./lib/types/index.d.ts",
      "require": "./lib/cjs/index.js",
      "import": "./lib/esm/index.js"
    }
}
```
* `type: "module"`: By default we use ESM Modules
* `lib/esm`: ESM built output
* `lib/cjs`: CJS build output
* `lib/types`: Typescript types
* No minified bundles are provided as these are left to frameworks to bundle.
