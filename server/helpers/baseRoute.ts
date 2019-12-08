// --- TYPING
import { App, Request, Response } from '../types'

/**
 * Passes route data into Next Application routing.
 *
 * @param app Next application
 * @param component Route component from /pages directory
 * @param page Page name - same as in templates directory
 */
const baseRoute = (app: App, component: string, page: string) => (req: Request, res: Response) =>
  app.render(req, res, `/${component}`, { slug: req.params, page })

export default baseRoute
