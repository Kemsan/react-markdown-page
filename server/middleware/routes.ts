// -- CORE
import express from 'express'
// -- HELPERS
import baseRoute from '../helpers/baseRoute'
// -- TYPING
import { NextRoutes } from '../types'

const routes = ({ app, pages }: NextRoutes) => {
  // Initialize router
  const router: express.IRouter = express.Router()
  const list = pages.list()

  // Base route
  router.get('/', baseRoute(app, 'landing', 'home'))

  // Create routes for each page
  list.forEach((route: string) => {
    router.get(`/${route}`, baseRoute(app, 'landing', route))
  })

  // Error route
  router.get('*', (req, res) => {
    res.status(404)

    // Run route
    baseRoute(app, '_error', 'error')(req, res)
  })

  return router
}

export default routes
