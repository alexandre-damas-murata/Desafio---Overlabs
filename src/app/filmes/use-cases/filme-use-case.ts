import { ApiResponse, FilmeProcessado, Premio, Rating, Sinopse } from '../../../core/types/filmes'

export class FilmeUseCase {
  private readonly apiUrl =
    'https://tv5hn2gvyijpl76yxlmsy66jwa0nlmxn.lambda-url.us-east-1.on.aws/'

  async parseMovies (): Promise<FilmeProcessado[]> {
    const response = await fetch(this.apiUrl)

    if (!response.ok) {
      throw new Error(
        `Erro ao consultar a API de filmes: ${response.status}`,
      )
    }

    const data = await response.json() as ApiResponse

    if (!Array.isArray(data.filmes)) {
      throw new Error('Formato de resposta inválido: filmes não encontrado')
    }

    return data.filmes.map((filme) => ({
      titulo: filme.titulo,
      ano: filme.ano,
      diretor: filme.diretor,
      genero: filme.genero,
      duracaoSegundos: this.durationInSeconds(filme.duracao),
      notaIMDb: this.imdbRating(filme.ratings),
      lucro: this.calcProfit(filme.orcamento, filme.bilheteria),
      maiorPremiacao: this.mostSignificantAward(filme.premios),
      sinopse: this.synopsis(filme.sinopse),
    }))
  }

  calcProfit (
    orcamento: string,
    bilheteria: string,
  ): string {
    const budget = this.parseMoney(orcamento)
    const boxOffice = this.parseMoney(bilheteria)

    const profit = boxOffice - budget
    const absoluteProfit = Math.abs(profit)

    const isBillion = absoluteProfit >= 1_000_000_000
    const divisor = isBillion ? 1_000_000_000 : 1_000_000

    const value = Number((absoluteProfit / divisor).toFixed(2))
    const formattedValue = String(value)

    const unit = isBillion
      ? (value === 1 ? 'bilhão' : 'bilhões')
      : (value === 1 ? 'milhão' : 'milhões')

    const sign = profit < 0 ? '-$' : '$'

    return `${sign}${formattedValue} ${unit}`
  }

  mostSignificantAward (premios: Premio[]): string {
    if (!premios?.length) {
      return ''
    }

    const premio = premios.reduce((maior, atual) =>
      atual.relevancia > maior.relevancia ? atual : maior,
    )

    return premio.nome
  }

  durationInSeconds (duracao: number): number {
    return duracao * 60
  }

  imdbRating (ratings: Rating[]): string {
    const rating = ratings?.find(
      (item) => item.fonte.toLowerCase() === 'imdb',
    )

    return rating ? String(rating.valor) : ''
  }

  synopsis (sinopses: Sinopse[]): string {
    if (!sinopses?.length) {
      return ''
    }

    const sinopsePtBr = sinopses.find(
      (item) => item.idioma.toLowerCase() === 'pt-br',
    )

    if (sinopsePtBr) {
      return sinopsePtBr.texto
    }

    const sinopseEn = sinopses.find(
      (item) => item.idioma.toLowerCase() === 'en',
    )

    if (sinopseEn) {
      return sinopseEn.texto
    }

    return sinopses[0].texto
  }

  private parseMoney (value: string): number {
    const match = value.match(
      /\$?\s*([\d.,]+)\s*(milh(?:ão|ões)|bilh(?:ão|ões))/i,
    )

    if (!match) {
      throw new Error(`Formato monetário inválido: ${value}`)
    }

    const amount = Number(match[1].replace(',', '.'))
    const unit = match[2].toLowerCase()

    if (!Number.isFinite(amount)) {
      throw new Error(`Valor monetário inválido: ${value}`)
    }

    if (unit.startsWith('bilh')) {
      return amount * 1_000_000_000
    }

    return amount * 1_000_000
  }
}
