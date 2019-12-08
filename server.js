try {
  // -- CONFIG
  const config = require('./client/next.config')
  let server

  // Check if we using build server
  if (process.env.NODE_ENV === 'production') {
    server = require('./build/node-server')
  } else {
    server = require('./server/entry.ts').default
  }

  server(config)
} catch (e) {
  console.error('ERROR: Cannot run server')
  console.error(e)

  process.exit(0)
}
