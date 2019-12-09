// -- CORE
const path = require('path')

try {
  // -- CONFIG
  const config = require('./client/next.config')
  const paths = {
    cache: path.resolve(__dirname, 'cache'),
    templates: path.resolve(__dirname, 'templates')
  }
  let server

  // Check if we using build server
  if (process.env.NODE_ENV === 'production') {
    server = require('./build/node-server/entry.js').default
  } else {
    server = require('./server/entry.ts').default
  }

  server(config, paths)
} catch (e) {
  console.error('ERROR: Cannot run server')
  console.error(e)

  process.exit(0)
}
