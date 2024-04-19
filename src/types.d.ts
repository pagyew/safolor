export type Num = number

export type Pct = `${number}%`

export type Alpha =
  Num |
  Pct

export type Color =
  ColorBase

export type ColorBase =
  HEX |
  ColorFunction

export type ColorFunction =
  RGB |
  RGBA

export type HEX = `#${string}`

export type RGB =
  LegacyRGB |
  ModernRGB

export type RGBA =
  LegacyRGBA |
  ModernRGBA

export type LegacyRGB =
  `rgb(${Num}, ${Num}, ${Num})` |
  `rgb(${Num}, ${Num}, ${Num}, ${Alpha})` |
  `rgb(${Pct}, ${Pct}, ${Pct})` |
  `rgb(${Pct}, ${Pct}, ${Pct}, ${Alpha})`

export type ModernRGB =
  `rgb(${Num | Pct} ${Num | Pct} ${Num | Pct})` |
  `rgb(${Num | Pct} ${Num | Pct} ${Num | Pct} / ${Alpha})`

export type LegacyRGBA =
  `rgba(${Num}, ${Num}, ${Num})` |
  `rgba(${Num}, ${Num}, ${Num}, ${Alpha})` |
  `rgba(${Pct}, ${Pct}, ${Pct})` |
  `rgba(${Pct}, ${Pct}, ${Pct}, ${Alpha})`

export type ModernRGBA =
  `rgba(${Num | Pct} ${Num | Pct} ${Num | Pct})` |
  `rgba(${Num | Pct} ${Num | Pct} ${Num | Pct} / ${Alpha})`

export interface RGBObject {
  r: Num
  g: Num
  b: Num
  a?: Num
}

export interface Safolor {
  (color: HEX): HEX
  (color: RGB | RGBA): HEX
  hex: {
    (color: HEX): HEX
    (color: RGB | RGBA): HEX
  }
  rgb: {
    (color: HEX): RGB
    (color: RGB | RGBA): RGB
  }
  rgbObj: {
    (color: HEX): RGBObject
    (color: RGB | RGBA): RGBObject
  }
}
