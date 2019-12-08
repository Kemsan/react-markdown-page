// --- CORE
import { RuleValue, OptionValue } from '../Rule'

/**
 * Set value based on existing data.
 * If array is passed as values - value are pushed into array
 * if values is non undefined then array is crated, and value merged into it
 * If value is undefined - value is jut passed as result
 *
 * Additionaly - method parses variable string based on content - strings,
 * numbers and boolean are converted to primitives
 *
 * @param data Value for option
 * @param values Array or string of values
 * @returns Value or array of values
 *
 * @example
 *
 * parsevalue('test')
 * // => 'test'
 *
 * parseValue('true')
 * // => true
 *
 * parseValue('1')
 * // => 1
 *
 * parseValue('2', '1')
 * // => [1, 2]
 *
 * parseValue('2'', [1])
 * // => [1, 2]
 *
 */
const parseValue = (
  data: OptionValue,
  values?: OptionValue | OptionValue[]
): RuleValue => {
  const options = Array.isArray(values) ? [...values] : values
  let value: OptionValue = data

  // Match all numbers
  if (!isNaN(Number(value))) {
    value = Number(value)
  }

  // Match booleans
  if (['true', 'false'].indexOf(String(value)) !== -1) {
    value = value === 'true'
  }

  // Attach data to list of variables
  if (options) {
    if (!Array.isArray(options)) {
      return [options, value]
    }

    return [...options, value]
  }

  return value
}

export default parseValue
