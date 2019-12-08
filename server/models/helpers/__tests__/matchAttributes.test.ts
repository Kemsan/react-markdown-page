// -- CORE
import matchAttributes from '../matchAttributes'

describe('matchAttributes', () => {
  it('should allow only array as parameter', () => {
    // @ts-ignore
    const data = matchAttributes()

    expect(data).toStrictEqual({
      attrs: {},
      text: ''
    })
  })

  it('should parse simple values', () => {
    const blocks = [
      '| option: value',
      '| option2: value2'
    ]

    const data = matchAttributes(blocks)

    expect(data).toStrictEqual({
      attrs: {
        option: 'value',
        option2: 'value2'
      },
      text: '\n'
    })
  })

  it('should parse extended values', () => {
    const blocks = [
      '| option: [attr="1"]',
      '| option2: [attr="2"]'
    ]
    const data = matchAttributes(blocks)

    expect(data).toStrictEqual({
      attrs: {
        option: {
          attr: 1
        },
        option2: {
          attr: 2
        }
      },
      text: '\n'
    })
  })

  it('should match array of values', () => {
    const blocks = [
      '| option: [attr="1"]',
      '| option: [attr="2"]'
    ]
    const data = matchAttributes(blocks)

    expect(data).toStrictEqual({
      attrs: {
        option: [{
          attr: 1
        }, {
          attr: 2
        }]
      },
      text: '\n'
    })
  })

  it('should match options and pass non-option values as text', () => {
    const blocks = [
      '| option: 1',
      'test',
      'test2',
      'test3'
    ]
    const data = matchAttributes(blocks)

    expect(data).toStrictEqual({
      attrs: {
        option: 1
      },
      text: 'test\ntest2\ntest3\n\n'
    })
  })

  it('should match options only if they are one after another', () => {
    const blocks = [
      '| option: 1',
      'test',
      'test2',
      'test3',
      '| option2: 2'
    ]
    const data = matchAttributes(blocks)

    expect(data).toStrictEqual({
      attrs: {
        option: 1
      },
      text: 'test\ntest2\ntest3\n| option2: 2\n\n'
    })
  })
})
