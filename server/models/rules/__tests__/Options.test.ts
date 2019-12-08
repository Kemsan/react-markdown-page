// -- CORE
import Options from '../Options'

// -- MOCKS
const singleBlock = `---
test
---`

const singleBlockWithOptions = `---
| test: Test
| test2: Test 2
---`

// -- TEST
describe('Options', () => {
  let option: Options

  beforeEach(() => {
    option = new Options()
  })

  it('should export class', () => {
    expect(typeof Options).toBe('function')
  })

  describe('match', () => {
    it('should match options block', () => {
      const data = option.match(singleBlock)

      expect(data).not.toBeNull()
      expect(data[3]).toBe('test')
    })
  })

  describe('parse', () => {
    it('should return base rule if no matches provided', () => {
      const block = option.parse(null)

      expect(block).toStrictEqual(option.rule())
    })

    it('should match and parse empty options block', () => {
      const matches = option.match(singleBlock)
      const block = option.parse(matches)

      expect(block.type).toBe('options')
      expect(block.attrs).toStrictEqual({})
    })

    it('should match and parse options block', () => {
      const matches = option.match(singleBlockWithOptions)
      const block = option.parse(matches)

      expect(block.type).toBe('options')
      expect(block.attrs).toStrictEqual({
        test: 'Test',
        test2: 'Test 2'
      })
    })
  })
})
