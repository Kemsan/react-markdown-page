import hpp from 'hpp'
import helmet from 'helmet'

export default [
  // Prevent HTTP Parameter pollution.
  // @see http://bit.ly/2f8q7Td
  hpp({}),

  // The xssFilter middleware sets the X-XSS-Protection header to prevent
  // reflected XSS attacks.a
  // @see https://helmetjs.github.io/docs/xss-filter/
  helmet.xssFilter(),

  // Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header.
  // @see https://helmetjs.github.io/docs/frameguard/
  helmet.frameguard({ action: 'deny' }),

  // Sets the X-Download-Options to prevent Internet Explorer from executing
  // downloads in your site’s context.
  // @see https://helmetjs.github.io/docs/ienoopen/
  helmet.ieNoOpen(),

  // Don’t Sniff Mimetype middleware, noSniff, helps prevent browsers from trying
  // to guess (“sniff”) the MIME type, which can have security implications. It
  // does this by setting the X-Content-Type-Options header to nosniff.
  // @see https://helmetjs.github.io/docs/dont-sniff-mimetype/
  helmet.noSniff()
]
