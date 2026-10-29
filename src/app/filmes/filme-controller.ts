import { FilmeUseCase } from './use-cases/filme-use-case'

export class FilmeController {
  private readonly filmeUseCase: FilmeUseCase
  constructor () {
    this.filmeUseCase = new FilmeUseCase()
  }

  async returnParsedMovies () {
    const response = await this.filmeUseCase.parseMovies()

    return response
  }
}
