// -- HELPERS
import matchOption from './matchOption'
import parseValue from './parseValue'
/// -- TYPES
import { OptionValue } from '../Rule'

// -- TYPING
export interface MatchData {
  attrs: MatchAttributes
  text: string
}

export interface MatchAttributes {
  [k: string]: OptionValue | any[]
}

// -- DATA
const ITEM_OPTION_REGEXP = /(?:\| )(\w+)(?:: )(.*)/

/**
 * Matches attributes for single rule block
 *
 * @param block Block of strings, splited by \n
 * @return Component data with text and attributes
 */
const matchAttributes = (block: string[]): MatchData => {
  const attrs: MatchAttributes = {}
  let text: string = ''

  if (!Array.isArray(block)) {
    return {
      attrs,
      text
    }
  }

  // If we have title for rule - we assume that this block of text is rule
  // Catch all rule options
  let optionCount = 0

  // Reset regex
  ITEM_OPTION_REGEXP.lastIndex = 0

  // Loop thru block - until there are option to match
  block.every(elem => {
    const option = ITEM_OPTION_REGEXP.exec(elem)
    let value: OptionValue
    let name: string

    // If option is matched - get option title and values
    if (option) {
      optionCount++

      name = option[1]
      value = matchOption(option[2])

      attrs[name] = parseValue(value, attrs[name])

      return true
    } else {
      return false
    }
  })

  // Get items for current rule
  text = [...block, '\n'].splice(optionCount).join('\n')

  return {
    attrs,
    text
  }
}

export default matchAttributes
