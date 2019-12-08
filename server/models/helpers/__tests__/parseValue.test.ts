// -- CORE
import parseValue from '../parseValue'

describe('parseValue', () => {
  it('should convert string, number, boolean into primitives', () => {
    const values = {
      test: 'test',
      0: 0,
      1: 1,
      Infinity: Infinity,
      '-1': -1,
      true: true,
      false: false
    }

    Object.keys(values).forEach(key => {
      expect(parseValue(key)).toBe(values[key])
    })
  })

  it('should push value to array if second parameter is array', () => {
    expect(parseValue('2', [1])).toStrictEqual([1, 2])
    expect(parseValue('def', ['abc'])).toStrictEqual(['abc', 'def'])
  })

  it('should create array of values if second argument has value', () => {
    expect(parseValue('2', 1)).toStrictEqual([1, 2])
    expect(parseValue('def', 'abc')).toStrictEqual(['abc', 'def'])
  })
})
