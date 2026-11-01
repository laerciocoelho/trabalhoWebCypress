# Automação Web com Cypress — Automation Exercise

Projeto de conclusão do curso de Automação Web. Automatiza os casos de teste **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** da página
[Test Cases](https://automationexercise.com/test_cases) do site [Automation Exercise](https://automationexercise.com).

## Tecnologias
- [Cypress](https://www.cypress.io/) (framework obrigatório)
- [cypress-mochawesome-reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) (relatórios)
- [@faker-js/faker](https://fakerjs.dev/) (dados dinâmicos)
- GitHub Actions (CI)

## Requisitos atendidos
| Requisito | Como foi atendido |
|---|---|
| Execução via GitHub Actions | `.github/workflows/cypress.yml` |
| Execução sem quebras | Dados únicos por teste, testes independentes, limpeza via API (`afterEach`), bloqueio de anúncios, `retries` em modo run |
| Seletores e padrões | Seletores centralizados em `cypress/support/selectors.js` (prioridade `data-qa` > id > name > href) |
| Boas práticas | Modularização com comandos customizados, factory de dados, fixture de pagamento, sem `cy.wait` fixo, sem dependência entre testes |
| Relatórios | Mochawesome em `cypress/reports/` e publicado como artefato no GitHub Actions |

## Estrutura
```
.github/workflows/cypress.yml        # pipeline
cypress/
  e2e/automation-exercise.cy.js      # spec única com os 10 casos de teste
  fixtures/pagamento.json            # dados do cartão
  support/
    commands/                        # comandos customizados (geral, api, autenticacao, produtos, checkout)
    factories/usuario.js             # gerador de usuário (faker)
    selectors.js                     # seletores centralizados
    commands.js / e2e.js             # registro dos comandos, reporter e bloqueio de anúncios
cypress.config.js
```

## Como executar
Pré-requisito: **Node.js 22 ou superior** (exigido pelo Cypress 16 e pelo reporter).

```bash
npm install          # instala dependências e o binário do Cypress
npm run cy:open      # modo interativo
npm run cy:run       # modo headless (gera o relatório)
```

O relatório HTML fica em `cypress/reports/index.html`.

## Pipeline (GitHub Actions)
Executa a cada push/PR (e manualmente em *Actions > Testes E2E - Cypress > Run workflow*), roda **somente a spec do trabalho final**
e publica o relatório como artefato **relatorio-mochawesome** (baixe, descompacte e abra o `index.html`).

## Observações
- Pré-condições (usuário existente) e limpeza usam a API do próprio site (`/api/createAccount` e `/api/deleteAccount`), enquanto os fluxos
  dos casos de teste (cadastro, login, exclusão, checkout) são feitos pela interface, conforme descrito em cada TC.
- TC09: valida que há resultados visíveis e que ao menos um deles contém o termo pesquisado.
- TC15/TC16: a confirmação do pedido é validada na página `payment_done` ("Order Placed!" / "Your order has been confirmed!").
