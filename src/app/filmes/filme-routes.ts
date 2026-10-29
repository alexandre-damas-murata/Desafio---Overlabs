import { FastifyInstance } from 'fastify'
import { FilmeController } from './filme-controller'

export async function filmeRoutes (fastify: FastifyInstance) {
  const filmeController = new FilmeController()

  fastify.post('/', () => {
    return filmeController.returnParsedMovies()
  })
}
