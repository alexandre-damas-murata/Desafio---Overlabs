export interface Rating {
  valor: number
  fonte: string
}

export interface Sinopse {
  texto: string
  idioma: string
}

export interface Premio {
  nome: string
  relevancia: number
}

interface FilmeApi {
  titulo: string
  ano: number
  diretor: string
  genero: string[]
  duracao: number
  ratings: Rating[]
  sinopse: Sinopse[]
  orcamento: string
  bilheteria: string
  premios: Premio[]
}

export interface ApiResponse {
  filmes: FilmeApi[]
}

export interface FilmeProcessado {
  titulo: string
  ano: number
  diretor: string
  genero: string[]
  duracaoSegundos: number
  notaIMDb: string
  lucro: string
  maiorPremiacao: string
  sinopse: string
}
