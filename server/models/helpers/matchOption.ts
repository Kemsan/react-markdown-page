// -- HELPERS
import parseValue from './parseValue'
import { OptionValue } from '../Rule'

// -- DATA
const ITEM_OPTION_VALUE_REGEXP = /(\w+(?==\w+)|(?!==\w+)\w+)(?!\[)(?=.*\])/g

/**
 * Searches for options value for given string. Option value can have two types of value:
 * simple - plain value, every string, number etc.
 * attribute-like - value in `[name="value"] format, can have more atttributes
 *
 * @param value Value to search for options
 * @returns Matched option - either string or object, based on given value
 *
 * @example
 *
 * const option = matchOption('[test="1" test="2"]')
 * //=> { "test": [1, 2] }
 *
 * const option = matchOption('value')
 * //=> 'value'
 *
 * const option = matchOption('[test="1" test2="2"])
 * //=> { "test": 1, "test2": 2 }
 */
const matchOption = (value: string): OptionValue => {
  // Dummy check, faster than regexp
  if (value.indexOf('[') === -1 && value.indexOf(']') === -1) {
    return value
  }

  // Match option values
  const matches = value.match(ITEM_OPTION_VALUE_REGEXP)
  const result = {}

  if (matches) {
    matches.forEach((name: string, idx: number): void => {
      const value: string = matches[idx + 1]

      // Because matches gives only array of strings, with first as title, and second as value we use
      // modullo here to get title element
      if (idx % 2 === 0) {
        result[name] = parseValue(value, result[name])
      }
    })

    return result
  }

  return parseValue(value)
}

export default matchOption
