import { makeExecutableSchema } from '@graphql-tools/schema'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import bodyParser from 'body-parser'
import http from 'http'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import { applyMiddleware } from 'graphql-middleware'
import { json } from 'body-parser'

import usersApiV1 from './api/v1/users'
import Config from './config'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'

const app = express()
const httpServer = http.createServer(app)

const { port, api } = Config

const corsOptions = {
  origin: '*',
  credentials: true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())

// CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Schema
const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers
  })
)

// API
app.use('/api/v1/users', usersApiV1)

// Apollo Server
const apolloServer = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

// Database Sync
const main = async () => {
  await apolloServer.start()

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const apiUrl = api?.baseUrl
        const apiVersions: Record<string, string> = {
          v1: `/api/${api?.version}`
        }
        const version = req.headers['api-version'] || api?.version
        const apiVersion: string = apiVersions[version as string] || apiVersions.v1

        return {
          request: (endpoint: string, options = {}) => {
            const requestOptions: any = {
              ...options,
              credentials: 'same-origin',
              headers: {
                'Content-Type': 'application/json'
              }
            }

            if (requestOptions.body) {
              requestOptions.body = JSON.stringify(requestOptions.body)
            }

            return fetch(`${apiUrl}${apiVersion}${endpoint}`, requestOptions).then((res) =>
              res.json()
            )
          }
        }
      }
    })
  )

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

main()
