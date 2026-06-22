# banco-api-tests

Projeto de automação de testes de API Rest para o sistema bancário [banco-api](https://github.com/Alexsantossilva44/banco-api).

## Objetivo

Validar os endpoints da API Rest do projeto banco-api, cobrindo cenários de autenticação e transferências financeiras, contribuindo que as regras de negócio e os contratos de resposta estejam corretos.

## Stack utilizada

| Ferramenta | Descrição |
|---|---|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Mocha](https://mochajs.org/) | Framework de testes |
| [Chai](https://www.chaijs.com/) | Biblioteca de assertions |
| [Supertest](https://github.com/ladjs/supertest) | Cliente HTTP para testes de API |
| [dotenv](https://github.com/motdotla/dotenv) | Carregamento de variáveis de ambiente |
| [Mochawesome](https://github.com/adamgruber/mochawesome) | Gerador de relatórios HTML |
| [mochawesome-merge](https://github.com/adamgruber/mochawesome-merge) | Merge de relatórios Mochawesome |
| [mochawesome-report-generator](https://github.com/adamgruber/mochawesome-report-generator) | Geração de relatório final em HTML |

## Estrutura de diretórios

```
banco-api-tests/
├── fixtures/
│   ├── postLogin.js           # Body da requisição de login
│   └── postTransferencia.js   # Body da requisição de transferência
├── helpers/
│   └── autentication.js       # Helper para autenticação e obtenção do token
├── mochawesome-report/        # Relatórios gerados (ignorado pelo git)
│   ├── mochawesome.html
│   └── mochawesome.json
├── test/
│   ├── login.test.js          # Testes do endpoint POST /login
│   └── transferencia.test.js  # Testes dos endpoints de transferências
├── .env                       # Variáveis de ambiente (não versionado)
├── .gitignore
└── package.json
```

## Configuração do ambiente

### Pré-requisitos

- Node.js instalado
- API [banco-api](https://github.com/Alexsantossilva44/banco-api) em execução

### Instalação

```bash
npm install
```

### Arquivo .env

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
BASE_URL=http://localhost:3000
```

> Substitua o valor pela URL onde a API banco-api estiver rodando.

## Execução dos testes

```bash
npm test
```

Os testes serão executados e um relatório HTML será gerado automaticamente na pasta `mochawesome-report/`.

## Relatório de testes

Após a execução, abra o relatório no navegador:

```
mochawesome-report/mochawesome.html
```

O relatório exibe os resultados de cada teste com detalhes de passes, falhas e duração.

## Testes cobertos

### Login

| Método | Endpoint | Cenário |
|---|---|---|
| POST | /login | Autenticação com credenciais válidas |

### Transferências

| Método | Endpoint | Cenário |
|---|---|---|
| POST | /transferencias | Valor igual ou acima de R$ 10,00 — esperado 201 |
| POST | /transferencias | Valor abaixo de R$ 10,00 — esperado 422 |
| GET | /transferencias/{id} | Busca de transferência por ID — esperado 200 |
| GET | /transferencias | Listagem com paginação — esperado 200 |

## Links úteis

- [Documentação Mocha](https://mochajs.org/)
- [Documentação Chai](https://www.chaijs.com/api/)
- [Documentação Supertest](https://github.com/ladjs/supertest)
- [Documentação dotenv](https://github.com/motdotla/dotenv)
- [Documentação Mochawesome](https://github.com/adamgruber/mochawesome)
- [Repositório da API testada](https://github.com/Alexsantossilva44/banco-api)
