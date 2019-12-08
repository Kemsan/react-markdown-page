// -- CORE
import express from 'express'
// -- DATA
import api from './api'
// -- TYPES
import { Models } from '../types'

/**
 * Creates main router
 *
 * @param models List of models passed to route provider
 * @param models.pages Pages model
 * @returns Express router
 */
const createRoutes = ({ pages }: Models): express.Router => {
  // Initialize router
  const router = express.Router()

  // Add route
  router.use('/api', api({ pages }))

  return router
}

export default createRoutes
