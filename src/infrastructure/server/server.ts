import Fastify from 'fastify'
import cors from '@fastify/cors'
import * as dotenv from 'dotenv'
import { filmeRoutes } from '../../app/filmes/filme-routes'

dotenv.config()

const server = Fastify()

async function start () {
  try {
    // 1. Registrar plugins
    await server.register(cors, { origin: true })

    // 2. Middleware para configurar CSP
    server.addHook('onSend', async (request, reply, payload) => {
      reply.header('Content-Security-Policy', `default-src 'self'; connect-src 'self' ${process.env.API_URL || 'http://localhost:3000'};`)
      return payload
    })

    // 3. Error handler global
    server.setErrorHandler((error, request, reply) => {
      // Erros não tratados (500)
      console.error('Erro não tratado:', error)
      return reply.status(500).send({
        code: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred',
      })
    })

    // 4. Registrar rotas
    await server.register(filmeRoutes, { prefix: '/filmes' })

    // 5. Iniciar servidor
    await server.listen({
      host: '0.0.0.0',
      port: process.env.PORT ?? 3000,
    } as any)

    console.log(`Servidor rodando na porta ${process.env.PORT ?? 3000}`)
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error)
    process.exit(1)
  }
}

start()
