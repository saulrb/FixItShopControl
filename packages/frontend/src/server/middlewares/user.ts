import { getUserData } from '@fixitshopcontrol/authentication'
import { NextFunction, Request, Response } from 'express'

import Config from '../../config'

export const isConnected =
  (isLogged = true, roles = ['user'], redirectTo = '/') =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await getUserData(req.cookies[`at`])

    if (!user && !isLogged) {
      return next()
    }

    if (user && isLogged) {
      res.cookie(
        'user',
        JSON.stringify({
          username: user.username,
          email: user.email,
          role: user.role,
          active: user.active,
          theme: user.theme,
          language: user.language
        }),
        {
          maxAge: 1000 * 60 * 60 * 24 * 180,
          encode: String
        }
      )

      if (roles.includes('god') && user.role === 'god') {
        return next()
      }

      if (roles.includes('admin') && user.role === 'admin') {
        return next()
      }

      if (roles.includes('editor') && user.role === 'editor') {
        return next()
      }

      if (roles.includes('user') && user.role === 'user') {
        return next()
      }

      res.redirect(redirectTo)
    } else {
      res.redirect(redirectTo)
    }
  }
