import path from 'path'
import cookieParser from 'cookie-parser'
import express, { Application, NextFunction, Request, Response } from 'express'
import nextJS from 'next'

import Config from '../config'
import { initializeApollo } from '../graphql/client'
import { isConnected } from './middlewares/user'
import { availableLocales } from '@truecabins/i18n'

const apolloClient = initializeApollo()
const port = 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = nextJS({ dev, port })
const handle = nextApp.getRequestHandler()

// Running Next App
nextApp.prepare().then(() => {
  // Express application
  const app: Application = express()

  // Cookies
  app.use(cookieParser())

  // Sites static directories
  app.use(express.static(path.join(__dirname, '../public')))

  app.use((req: any, res: Response, next: NextFunction) => {
    req.apolloClient = apolloClient
    req.cwd = process.cwd()

    next()
  })

  // Custom Routes
  app.get(
    [`/:locale(${availableLocales()})/login`, '/login'],
    isConnected(false),
    (req: Request, res: Response) => {
      const { locale = Config.i18n.defaultLocale } = req.params

      return nextApp.render(req, res, `/${locale}/login`, { locale })
    }
  )

  // Traffic handling
  app.all('*', (req: Request, res: Response) => handle(req, res))

  // Listening...
  app.listen(port)
})
