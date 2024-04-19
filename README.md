# @pagyew/safolor

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Convert colors to 8-bit web-safe colors

> This package is designed to be used as `devDependencies` and bundled into your dist.

## Installation

```
npm i @pagyew/safolor
```

## Usage

```ts
import { safolor } from '@pagyew/safolor'
```

### `safolor(color: HEX | RGB): HEX`

Shortcut for `safolor.hex()`

### `.hex(color: HEX | RGB): HEX`

Accepts a color in HEX or RGB format and returns a safecolor in HEX format

```ts
safolor.hex('#123456') // #003366
```

### `.rgb(color: HEX | RGB): RGB`

Accepts a color in HEX or RGB format and returns a safecolor in RGB format

```ts
safolor.rgb('#123456') // rgb(0, 51, 102)
```

### `.rgbObj(color: HEX | RGB): RGBObject`

Accepts a color in HEX or RGB format and returns a safecolor's values in RGB object

```ts
safolor.rgbObj('#123456') // { r: 0, g: 51, b: 102 }
```

## License
[MIT](./LICENSE) License © 2024-PRESENT [Vladislav Tsepilov](https://github.com/pagyew)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@pagyew/safolor?style=flat&colorA=000033&colorB=6699cc
[npm-version-href]: https://npmjs.com/package/@pagyew/safolor
[npm-downloads-src]: https://img.shields.io/npm/dm/@pagyew/safolor?style=flat&colorA=003300&colorB=99cc66
[npm-downloads-href]: https://npmjs.com/package/@pagyew/safolor
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@pagyew/safolor?style=flat&colorA=330000&colorB=cc6699&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@pagyew/safolor
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=003333&colorB=669999
[jsdocs-href]: https://www.jsdocs.io/package/@pagyew/safolor
[license-src]: https://img.shields.io/github/license/pagyew/safolor.svg?style=flat&colorA=333300&colorB=999966
[license-href]: https://github.com/pagyew/safolor/blob/main/LICENSE
