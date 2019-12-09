/**
 * Santizes url into safe value
 *
 * @param url - url to sanitize
 * @returns Url if safe, or null if a safe url could not be made
 */
const sanitizeUrl = (url?: string) => {
  if (!url) {
    return null
  }

  try {
    const protocol = decodeURIComponent(url).replace(/[^A-Za-z0-9/:]/g, '').toLowerCase()

    if (protocol.indexOf('javascript:') === 0 || protocol.indexOf('data:') === 0) {
      return null
    }
  } catch (e) {
    // decodeURIComponent sometimes throws a URIError
    // See `decodeURIComponent('a%AFc');`
    // http://stackoverflow.com/questions/9064536/javascript-decodeuricomponent-malformed-uri-exception
    return null
  }

  return url
}

export default sanitizeUrl
