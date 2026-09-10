<div align="center">
  <h1>safolor</h1>
  <p><strong>Turn a CSS color into its nearest web-safe neighbor.</strong></p>
  <p>
    <img src="https://img.shields.io/badge/TypeScript-typed-3178c6?style=flat-square" alt="TypeScript: typed" />
    <img src="https://img.shields.io/badge/palette-216%20colors-669999?style=flat-square" alt="palette: 216 colors" />
    <img src="https://img.shields.io/badge/license-MIT-0f766e?style=flat-square" alt="license: MIT" />
  </p>
  <p><a href="#installation">Install</a> · <a href="#api">API</a> · <a href="#development">Development</a> · <a href="https://www.npmjs.com/package/@pagyew/safolor">npm</a></p>
</div>

---

A small color utility that rounds each RGB channel to the nearest multiple of 51. The result belongs to the classic **216-color web-safe palette**.

Accepts HEX, RGB, and RGBA strings and returns a HEX string, an RGB string, or an RGB object. Type definitions, ESM, and CommonJS entry points are included.

## Installation

```sh
npm install --save-dev @pagyew/safolor
```

The package is intended to be bundled into your distribution. If your application imports it directly at runtime without bundling, install it as a regular dependency instead.

## Usage

```ts
import { safolor } from '@pagyew/safolor'

safolor('#123456') // '#003366'
safolor.hex('#123456') // '#003366'
safolor.rgb('#123456') // 'rgb(0, 51, 102)'
safolor.rgbObj('#123456') // { r: 0, g: 51, b: 102 }
```

## API

| Call                    | Returns                                   |
| ----------------------- | ----------------------------------------- |
| `safolor(color)`        | HEX; shortcut for `safolor.hex(color)`    |
| `safolor.hex(color)`    | A six-digit HEX color                     |
| `safolor.rgb(color)`    | An `rgb(r, g, b)` string                  |
| `safolor.rgbObj(color)` | An object with `r`, `g`, and `b` channels |

Supported inputs include 3-, 4-, 6-, and 8-digit HEX values and legacy or modern `rgb()` / `rgba()` syntax, including percentage channels. Alpha can be parsed but is **not preserved** in the output. Named colors and HSL are not supported.

Non-string inputs throw `TypeError`; invalid or unsupported color strings throw `SyntaxError`.

## Development

```sh
git clone https://github.com/pagyew/safolor.git
cd safolor
npm ci
npm run test -- --run
npm run typecheck
npm run lint
npm run build
```

Implementation: [src/safolor.ts](src/safolor.ts). Parsing and channel rounding: [src/helpers.ts](src/helpers.ts). Examples and edge cases: [src/safolor.test.ts](src/safolor.test.ts).

## Links

[npm package](https://www.npmjs.com/package/@pagyew/safolor) · [API reference](https://www.jsdocs.io/package/@pagyew/safolor) · [Bundle size](https://bundlephobia.com/result?p=@pagyew/safolor)

## License

[MIT](LICENSE). See the license file for the original copyright notice.

<!-- Сообщение сформировано агентом -->
