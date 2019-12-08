// -- CORE
import flatten from '../flatten'

// -- TEST
describe('flatten', () => {
  it('should return array', () => {
    // @ts-ignore
    expect(flatten(1)).toStrictEqual([])
    expect(flatten(undefined)).toStrictEqual([])
    // @ts-ignore
    expect(flatten(true)).toStrictEqual([])
    expect(flatten([1, 2, 3])).toStrictEqual([1, 2, 3])
  })

  it('should result this same array', () => {
    const array = [1, 2, 3]

    expect(flatten(array)).toStrictEqual(array)
  })

  it('should flat nested array', () => {
    const array = [1, [2]]
    const deepArray = [array, [array, [array]]]

    expect(flatten(array)).toStrictEqual([1, 2])
    expect(flatten(deepArray)).toStrictEqual([1, 2, 1, 2, 1, 2])
  })
})
