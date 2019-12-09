// -- CORE
import next from 'next'
import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
// -- MIDDLEWARE
import security from './middleware/security'
import routes from './middleware/routes'
// -- MODELS
import Pages from './models/Pages'
// -- CONTROLLERS
import controllers from './controllers'
// -- HELPERS
import 'colors'

// DATA
const PORT = process.env.PORT || 3000
const PRODUCTION = process.env.NODE_ENV === 'production'

/**
 * Starts application using Express server
 *
 * @param config Config for application
 */
const app = async (config: object, paths: object) => {
  const app = next({
    dir: './client',
    dev: !PRODUCTION,
    conf: config
  })

  const server: express.Express = express()
  const pages: Pages = new Pages(paths)

  // Prepare app
  await app.prepare()

  // Don't expose any software information to potential hackers.
  server.disable('x-powered-by')
  server.use(...security)
  server.use(compression({ level: 6 }))
  server.use(cookieParser())
  server.use(bodyParser.json())
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(controllers({ pages }))
  // Non elegant way to reintroduce routes on each request
  server.use((req, res, next) => routes({ app, pages })(req, res, next))

  try {
    // Setup watcher
    await pages.parser.watch()

    server.listen(PORT, () => {
      console.info(`⬛  🎉  Ready on ${(`http://localhost:${PORT}`).bold}`.yellow)  // eslint-disable-line
    })
  } catch (e) {
    console.error(e)

    process.exit(1)
  }
}

export default app
