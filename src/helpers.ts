import type { RGBObject } from './types'

const validHEXSymbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']

function hexToInt(symbol: string): number {
  return Number.parseInt(symbol, 16)
}

export function intToHex(number: number): string {
  const str = number.toString(16)
  return str.padEnd(2, str)
}

function normalizePct(number: number): number {
  return Math.max(0, Math.min(100, number))
}

function normalizeRGBValue(number: number): number {
  return Math.max(0, Math.min(255, number))
}

function pctToInt(pct: string): number {
  return normalizePct(Number.parseFloat(pct)) / 100
}

function rgbValueToInt(value: string): number {
  return normalizeRGBValue(Number.parseFloat(value))
}

function parseHEX(color: string): RGBObject {
  if (color.toLowerCase().split('').slice(1).some(l => !validHEXSymbols.includes(l)))
    throw new SyntaxError('For HEX format expected only HEX symbols')

  const hex = color.slice(1)
  let r
  let g
  let b
  let a

  switch (hex.length) {
    case 3:
    case 4:
      r = hexToInt(hex[0] + hex[0])
      g = hexToInt(hex[1] + hex[1])
      b = hexToInt(hex[2] + hex[2])
      hex[3] && (a = hexToInt(hex[3] + hex[3]))
      break
    case 6:
    case 8:
      r = hexToInt(hex[0] + hex[1])
      g = hexToInt(hex[2] + hex[3])
      b = hexToInt(hex[4] + hex[5])
      hex[6] && (a = hexToInt(hex[6] + hex[7]))
      break
    default:
      throw new SyntaxError('For HEX format expected 3, 4, 6, or 8 symbols')
  }

  return { r, g, b, a }
}

function parseRGB(color: string): RGBObject {
  const rgbLegacyPct = color.match(/^rgba?\(\s*(\d*\.?\d+%)\s*,\s*(\d*\.?\d+%)\s*,\s*(\d*\.?\d+%)\s*(,\s*(\d*\.?\d+%?)\s*)?\)$/)
  const rgbLegacyInt = color.match(/^rgba?\(\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\s*(,\s*(\d*\.?\d+%?)\s*)?\)$/)
  const rgbModernPct = color.match(/^rgba?\(\s*(\d*\.?\d+%|none)\s+(\d*\.?\d+%|none)\s+(\d*\.?\d+%|none)\s*(?:\/\s*(\d*\.?\d+%?|none)\s*)?\)$/)
  const rgbModernInt = color.match(/^rgba?\(\s*(\d*\.?\d+|none)\s+(\d*\.?\d+|none)\s+(\d*\.?\d+|none)\s*(?:\/\s*(\d*\.?\d+%?|none)\s*)?\)$/)
  const rgb = rgbLegacyPct || rgbLegacyInt || rgbModernPct || rgbModernInt

  if (rgb === null)
    throw new SyntaxError('Invalid RGB format, expected legacy or modern syntax with 3 or 4 values')

  const [_, R, G, B, A = '1'] = rgb
  const r = R === 'none' ? 0 : R.endsWith('%') ? pctToInt(R) * 255 : rgbValueToInt(R)
  const g = G === 'none' ? 0 : G.endsWith('%') ? pctToInt(G) * 255 : rgbValueToInt(G)
  const b = B === 'none' ? 0 : B.endsWith('%') ? pctToInt(B) * 255 : rgbValueToInt(B)
  const a = A === 'none' ? 0 : A.endsWith('%') ? pctToInt(A) : Math.max(0, Math.min(1, Number.parseFloat(A)))

  return { r, g, b, a }
}

export function parse(color: any): RGBObject {
  if (typeof color !== 'string')
    throw new TypeError('Expected a string')

  if (!(color.startsWith('#') || color.startsWith('rgb')))
    throw new SyntaxError('Expected a HEX or RGB format')

  let rgbObject: RGBObject
    = { r: 0, g: 0, b: 0, a: 1 }

  if (color.startsWith('#'))
    rgbObject = parseHEX(color)
  else if (color.startsWith('rgb'))
    rgbObject = parseRGB(color)

  return rgbObject
}

export function safe(color: RGBObject): RGBObject {
  const { r, g, b } = color
  const nR = Math.round(r / 51) * 51
  const nG = Math.round(g / 51) * 51
  const nB = Math.round(b / 51) * 51

  return { r: nR, g: nG, b: nB }
}
