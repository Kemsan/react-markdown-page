// -- CORE
import { createHash } from 'crypto'

/**
 * Converts given string into md5
 *
 * @param data String to convert into MD5
 * @returns MD5 string
 */
const md5 = (data: string): string => createHash('md5').update(data).digest('hex')

export default md5
