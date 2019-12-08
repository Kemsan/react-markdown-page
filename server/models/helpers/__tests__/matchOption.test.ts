// -- CORE
import matchOption from '../matchOption'

describe('matchOption', () => {
  it('should match only if there is square blocks around value', () => {
    const properValue = '[a="b"]'
    const proper = matchOption(properValue)

    let wrongValue = 'test="a"'
    let wrong = matchOption(wrongValue)

    expect(typeof proper).toBe('object')

    expect(typeof wrong).toBe('string')
    expect(wrong).toBe(wrongValue)

    wrongValue = '[--]'
    wrong = matchOption(wrongValue)

    expect(typeof wrong).toBe('string')
    expect(wrong).toBe(wrongValue)
  })

  it('should match options in attribute format', () => {
    const value = '[a="b" b="c"]'
    const secondValue = '["a"="b" b="c"]'

    const proper = matchOption(value)
    const second = matchOption(secondValue)

    expect(typeof proper).toBe('object')
    expect(typeof proper).toBe(typeof second)
    expect(proper).toStrictEqual({
      a: 'b',
      b: 'c'
    })
    expect(proper).toStrictEqual(second)
  })

  it('should convert values into proper formats', () => {
    const text = matchOption('[a="test"]')
    const number = matchOption('[a="1" b="1a"]')
    const boolean = matchOption('[a="true" b="false"]')

    expect(text).toStrictEqual({
      a: 'test'
    })

    expect(number).toStrictEqual({
      a: 1,
      b: '1a'
    })

    expect(boolean).toStrictEqual({
      a: true,
      b: false
    })
  })

  it('should convert single value without attribute value', () => {
    const data = matchOption('[a]')

    expect(data).toStrictEqual({
      a: undefined
    })
  })
})
