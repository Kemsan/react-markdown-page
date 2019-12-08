// -- TYPING
export interface DeepArray<T> extends Array<T | DeepArray<T>> { }

/**
 * Flatten an arbitrarrily deep Array of Arrays to a single Array
 *
 * @param array Array of Arrays to flatten
 * @returns The flattened Array
 * @example
 *
 * flatten([1])
 * // => [1]
 *
 * flatten([1, [2]])
 * // => [1, 2]
 *
 * flatten([1, [2, [3]]])
 * // => [1, 2, 3]
 */
const flatten = <P>(array: DeepArray<P>): any[] => {
  let result: any[] = []

  if (!Array.isArray(array)) {
    return result
  }

  // Copy array
  result = [...array]

  return result.reduce((total: P[], current: P | P[]) =>
    total.concat(Array.isArray(current) ? flatten(current) : current), [])
}

export default flatten
