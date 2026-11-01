import { SEL } from '../selectors';

const escapar = (texto) => texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

Cypress.Commands.add('validarTexto', (seletor, texto) => {
  const matcher = texto instanceof RegExp ? texto : new RegExp(escapar(texto), 'i');
  cy.contains(seletor, matcher).should('be.visible');
});

Cypress.Commands.add('acessarHome', () => {
  cy.visit('/');
  cy.title().should('eq', 'Automation Exercise');
  cy.get(SEL.home.logo).should('be.visible');
  cy.get(SEL.home.slider).should('be.visible');
});

Cypress.Commands.add('abrirProdutos', () => {
  cy.get(SEL.menu.produtos).click();
  cy.url().should('include', '/products');
  cy.validarTexto(SEL.produtos.titulo, 'All Products');
});
