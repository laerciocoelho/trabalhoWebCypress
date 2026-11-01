import { SEL } from '../selectors';

Cypress.Commands.add('validarListaDeProdutos', () => {
  cy.get(SEL.produtos.lista).should('be.visible');
  cy.get(SEL.produtos.cards).should('have.length.greaterThan', 0);
});

Cypress.Commands.add('abrirPrimeiroProduto', () => {
  cy.get(SEL.produtos.cards).first().find(SEL.produtos.verProduto).click();
  cy.url().should('match', /\/product_details\/\d+/);
});

Cypress.Commands.add('validarDetalhesDoProduto', () => {
  cy.get(SEL.produtos.detalhes)
    .should('be.visible')
    .within(() => {
      cy.get('h2').should('be.visible').and('not.be.empty');
      cy.contains('p', /category:/i).should('be.visible');
      cy.contains('span', /rs\.\s*\d+/i).should('be.visible');
      cy.contains('p', /availability:/i).should('be.visible');
      cy.contains('p', /condition:/i).should('be.visible');
      cy.contains('p', /brand:/i).should('be.visible');
    });
});

Cypress.Commands.add('buscarProduto', (termo) => {
  cy.get(SEL.produtos.busca).type(termo);
  cy.get(SEL.produtos.botaoBusca).click();
  cy.validarTexto(SEL.produtos.titulo, 'Searched Products');
});

Cypress.Commands.add('validarResultadosDaBusca', (termo) => {
  cy.get(SEL.produtos.nomesNaLista)
    .should('have.length.greaterThan', 0)
    .each(($nome) => cy.wrap($nome).should('be.visible'));
  cy.contains(SEL.produtos.nomesNaLista, new RegExp(termo, 'i')).should('be.visible');
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (indice = 0) => {
  cy.get(SEL.produtos.cards).eq(indice).find(SEL.produtos.adicionarNoCard).click();
  cy.get(SEL.carrinho.modal).should('be.visible');
  cy.validarTexto(`${SEL.carrinho.modal} h4`, 'Added!');
  cy.get(SEL.carrinho.continuarComprando).click();
  cy.get(SEL.carrinho.modal).should('not.be.visible');
});
