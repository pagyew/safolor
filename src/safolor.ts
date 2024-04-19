import { intToHex, parse, safe } from './helpers'
import type { HEX, RGB, RGBA, RGBObject, Safolor } from './types'

export const safolor: Safolor = (() => {
  let color: RGBObject
  let safeColor: RGBObject

  function exec(original: string) {
    color = parse(original)
    safeColor = safe(color)
  }

  function hex(color: HEX): HEX
  function hex(color: RGB | RGBA): HEX
  function hex(color: string): HEX {
    exec(color)
    const { r, g, b } = safeColor
    return `#${intToHex(r)}${intToHex(g)}${intToHex(b)}`
  }

  function rgb(color: HEX): RGB
  function rgb(color: RGB | RGBA): RGB
  function rgb(color: string): RGB {
    const { r, g, b } = call.rgbObj(color as any)
    return `rgb(${r}, ${g}, ${b})`
  }

  function rgbObj(color: HEX): RGBObject
  function rgbObj(color: RGB | RGBA): RGBObject
  function rgbObj(color: string): RGBObject {
    exec(color)
    return safeColor
  }

  function call(color: HEX): HEX
  function call(color: RGB | RGBA): HEX
  function call(color: string): HEX {
    return call.hex(color as any)
  }

  call.hex = hex
  call.rgb = rgb
  call.rgbObj = rgbObj

  return call
})()
