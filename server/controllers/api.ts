// -- CORE
import express from 'express'
import { success, error } from '../helpers/baseResponse'
// -- TYPES
import { Models } from '../types'

/**
 * Creates api router
 *
 * @param models List of models passed to route provider
 * @param models.pages Pages model
 * @returns Express router
 */
const createRoutes = ({ pages }: Models): express.Router => {
  // Create router
  const router = express.Router()

  // Route for fetching page file from cache
  router.get('/p/:page', async (req, res) => {
    const page = String(req.params.page)

    try {
      // Try to get file from cache
      const content = await pages.page(page)

      // If we got file, then
      if (content) {
        res.json(success(content))

        return
      }
    } catch (e) {
      res.json(error({
        content: null,
        message: `Missing cache for page ${page}`
      }))
    }
  })

  // Options
  router.get('/config', async (req, res) => {
    try {
      const options = await pages.options()

      if (options) {
        res.json(success(options))

        return
      }
    } catch (e) {
      res.json(success({
        title: ''
      }))
    }
  })

  return router
}

export default createRoutes
