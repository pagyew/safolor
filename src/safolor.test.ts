import { describe, expect, it, vi } from 'vitest'
import { safolor } from './safolor'

describe('safolor', () => {
  describe('errors', () => {
    const typeErrorMessage = 'Expected a string'
    const formatErrorMessage = 'Expected a HEX or RGB format'
    const hexLengthErrorMessage = 'For HEX format expected 3, 4, 6, or 8 symbols'
    const hexSymbolsErrorMessage = 'For HEX format expected only HEX symbols'
    const rgbErrorMessage = 'Invalid RGB format, expected legacy or modern syntax with 3 or 4 values'

    it.each([
      [true, new TypeError(typeErrorMessage)],
      ['some color', new SyntaxError(formatErrorMessage)],
      ['#', new SyntaxError(hexLengthErrorMessage)],
      ['#1', new SyntaxError(hexLengthErrorMessage)],
      ['#12', new SyntaxError(hexLengthErrorMessage)],
      ['#12345', new SyntaxError(hexLengthErrorMessage)],
      ['#1234567', new SyntaxError(hexLengthErrorMessage)],
      ['#123456789', new SyntaxError(hexLengthErrorMessage)],
      ['#qwerty', new SyntaxError(hexSymbolsErrorMessage)],
      ['rgb(123, 50%, 255)', new SyntaxError(rgbErrorMessage)],
      ['rgba(123 50 255 1)', new SyntaxError(rgbErrorMessage)],
      ['rgb(123 50 255, 1)', new SyntaxError(rgbErrorMessage)],
      ['rgba(123 50% 255 / 1)', new SyntaxError(rgbErrorMessage)],
      ['rgb(123, 50, 255 / 1)', new SyntaxError(rgbErrorMessage)],
      ['rgba(123, 50, 255 1)', new SyntaxError(rgbErrorMessage)],
      ['rgb(123, 50 255, 1)', new SyntaxError(rgbErrorMessage)],
    ])('%s => %s', (o_color, s_color) => {
      expect(() => safolor(o_color as any)).toThrowError(s_color)
    })
  })

  describe('() direct call', () => {
    it('() calls .hex() method', () => {
      const color = '#123456'
      const spy = vi.spyOn(safolor, 'hex').mockImplementationOnce(() => color)

      safolor(color)
      expect(spy).toHaveBeenCalledWith(color)

      spy.mockRestore()
    })
  })

  describe('.hex() method', () => {
    describe('from hex', () => {
      it.each([
        ['#000000', '#000000'],
        ['#123456', '#003366'],
        ['#abcdef', '#99ccff'],
        ['#01234567', '#003333'],
        ['#fff', '#ffffff'],
        ['#1af', '#0099ff'],
        ['#cdef', '#ccccff'],
      ])('%s => %s', (o_color, s_color) => {
        expect(safolor.hex(o_color as any)).toBe(s_color)
      })
    })

    describe('from rgb', () => {
      it.each([
        ['rgb(0, 0, 0)', '#000000'],
        ['rgba(18, 52, 86, 1)', '#003366'],
        ['rgb(100, 136, 170, 50%)', '#669999'],
        ['rgba(200%, 100%, 100%)', '#ffffff'],
        ['rgb(100%, 36%, 70%, 0.404)', '#ff66cc'],
        ['rgba(18%, 52%, 86%, 50%)', '#3399cc'],
        ['rgb(171 205 239)', '#99ccff'],
        ['rgba(255 255 255 / 2)', '#ffffff'],
        ['rgb(17 170 255 / 50%)', '#0099ff'],
        ['rgba(40.4% 42.1% 83.8%)', '#6666cc'],
        ['rgb(57.1% 20.5% 73.9% / .5)', '#9933cc'],
        ['rgba(37.1% 60.5% 23.9% / 60%)', '#669933'],
      ])('%s => %s', (o_color, s_color) => {
        expect(safolor.hex(o_color as any)).toBe(s_color)
      })
    })
  })

  describe('.rgb() method', () => {
    it('.rgb() calls .rgbObj() method', () => {
      const color = '#123456'
      const returned = { r: 18, g: 52, b: 86, a: 1 }
      const spy = vi.spyOn(safolor, 'rgbObj').mockImplementationOnce(() => returned)

      safolor.rgb(color)
      expect(spy).toHaveBeenCalledWith(color)

      spy.mockRestore()
    })

    describe('from hex', () => {
      it.each([
        ['#000000', 'rgb(0, 0, 0)'],
        ['#123456', 'rgb(0, 51, 102)'],
        ['#abcdef', 'rgb(153, 204, 255)'],
        ['#01234567', 'rgb(0, 51, 51)'],
        ['#fff', 'rgb(255, 255, 255)'],
        ['#1af', 'rgb(0, 153, 255)'],
        ['#cdef', 'rgb(204, 204, 255)'],
      ])('%s => %s', (o_color, s_color) => {
        expect(safolor.rgb(o_color as any)).toBe(s_color)
      })
    })

    describe('from rgb', () => {
      it.each([
        ['rgb(0, 0, 0)', 'rgb(0, 0, 0)'],
        ['rgba(18, 52, 86, 1)', 'rgb(0, 51, 102)'],
        ['rgb(100, 136, 170, 50%)', 'rgb(102, 153, 153)'],
        ['rgba(200%, 100%, 100%)', 'rgb(255, 255, 255)'],
        ['rgb(100%, 36%, 70%, 0.404)', 'rgb(255, 102, 204)'],
        ['rgba(18%, 52%, 86%, 50%)', 'rgb(51, 153, 204)'],
        ['rgb(171 205 239)', 'rgb(153, 204, 255)'],
        ['rgba(255 255 255 / 2)', 'rgb(255, 255, 255)'],
        ['rgb(17 170 255 / 50%)', 'rgb(0, 153, 255)'],
        ['rgba(40.4% 42.1% 83.8%)', 'rgb(102, 102, 204)'],
        ['rgb(57.1% 20.5% 73.9% / .5)', 'rgb(153, 51, 204)'],
        ['rgba(37.1% 60.5% 23.9% / 60%)', 'rgb(102, 153, 51)'],
      ])('%s => %s', (o_color, s_color) => {
        expect(safolor.rgb(o_color as any)).toBe(s_color)
      })
    })
  })

  describe('.rgbObj() method', () => {
    describe('from hex', () => {
      it.each([
        ['#000000', { r: 0, g: 0, b: 0 }],
        ['#123456', { r: 0, g: 51, b: 102 }],
        ['#abcdef', { r: 153, g: 204, b: 255 }],
        ['#01234567', { r: 0, g: 51, b: 51 }],
        ['#fff', { r: 255, g: 255, b: 255 }],
        ['#1af', { r: 0, g: 153, b: 255 }],
        ['#cdef', { r: 204, g: 204, b: 255 }],
      ])('%s => %s', (o_color, s_color) => {
        expect(safolor.rgbObj(o_color as any)).toStrictEqual(s_color)
      })
    })

    describe('from rgb', () => {
      it.each([
        ['rgb(0, 0, 0)', { r: 0, g: 0, b: 0 }],
        ['rgba(18, 52, 86, 1)', { r: 0, g: 51, b: 102 }],
        ['rgb(100, 136, 170, 50%)', { r: 102, g: 153, b: 153 }],
        ['rgba(200%, 100%, 100%)', { r: 255, g: 255, b: 255 }],
        ['rgb(100%, 36%, 70%, 0.404)', { r: 255, g: 102, b: 204 }],
        ['rgba(18%, 52%, 86%, 50%)', { r: 51, g: 153, b: 204 }],
        ['rgb(171 205 239)', { r: 153, g: 204, b: 255 }],
        ['rgba(255 255 255 / 2)', { r: 255, g: 255, b: 255 }],
        ['rgb(17 170 255 / 50%)', { r: 0, g: 153, b: 255 }],
        ['rgba(40.4% 42.1% 83.8%)', { r: 102, g: 102, b: 204 }],
        ['rgb(57.1% 20.5% 73.9% / .5)', { r: 153, g: 51, b: 204 }],
        ['rgba(37.1% 60.5% 23.9% / 60%)', { r: 102, g: 153, b: 51 }],
      ])('%s => %s', (o_color, s_color) => {
        expect(safolor.rgbObj(o_color as any)).toStrictEqual(s_color)
      })
    })
  })
})
