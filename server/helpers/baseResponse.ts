// -- TYPING
export type ResponseType = 'success' | 'error'

/**
 * Base response object.
 *
 * @param type Response type, success or error
 * @param data Additional data for response
 * @returns Response object
 */
export const base = (type: ResponseType, data: object): object => ({
  time: new Date().getTime(),
  type,
  data
})

/**
 * Success response object
 *
 * @param data Additonal data for response
 * @returns Response object
 *
 */
export const success = (data: object): object => base('success', data)

/**
 * Error response object
 *
 * @param data Additonal data for response
 * @returns Response object
 *
 */
export const error = (data: object): object => base('error', data)
