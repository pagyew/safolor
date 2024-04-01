import { describe, expect, it } from 'vitest'
import { safolor } from './safolor'

describe('safolor', () => {
  it.each([
    ['#000000', '#000000'],
    ['#123456', '#003366'],
    ['#abcdef', '#99ccff'],
    ['#01234567', '#003333'],
    ['#fff', '#ffffff'],
    ['#1af', '#0099ff'],
    ['#cdef', '#ccccff'],
  ])('%s => %s', (o_color, s_color) => {
    expect(safolor(o_color as any)).toBe(s_color)
  })

  it.each([
    [true, new TypeError('Expected a string')],
    ['rgb(255 255 255)', new SyntaxError('Expected a HEX format')],
  ])('%s => %s', (o_color, s_color) => {
    expect(() => safolor(o_color as any)).toThrowError(s_color)
  })
})
