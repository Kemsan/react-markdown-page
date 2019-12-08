// -- CORE
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import Pages from './models/Pages'

export interface App {
  render: (req: Express.Request, res: Express.Response, path: string, params: object) => void
}

export interface Request extends ExpressRequest {}
export interface Response extends ExpressResponse {}

export interface Models {
  pages: Pages
}

export interface NextRoutes {
  pages: Pages
  app: App
}
