1. Eu já tenho um base pré pronta padrão para projetos typescript em fastfy, então reutilizei ela.

2. Pensei em como gostaria que fosse a estrutura da aplicação desafio.

3. Alterei minha base pré pronta excluindo arquivos e pastas desnecessárias para o desafio e ajustei o restante para que coubesse dentro da proposta e dentro do que achava necessário para o desafio.

4. Iniciei o desenvolvimento construindo o arquivo [filme-routes](../src/app/filmes/filme-routes.ts), decidi por fazer um post, pois embora o resultado final seja uma devolutiva de dados a inteção da rota é parsear dados, não exatamente busca-los.

5. Desenvolvi a Controller [filme-controller](../src/app/filmes/filme-controller.ts) para manter um padrão de qualidade de código e projeto, não por necessidade ral.

6. E fui desenvolvendo a [file-use-case](../src/app/filmes/use-cases/filme-use-case.ts) aos poucos, construi primeiro a função chamada pela controller que deveria fazer a chamada a api e chamar as outras funções que resultariam no resultado final do parse, depois fui construindo as outras funções e implementando os métodos colocando os types em [filmes](../src/core/types/filmes.ts)

7. Instanciei o projeto e testei no insomnia e o resultado foi o que eu esperava.

8. Documentei os passos.