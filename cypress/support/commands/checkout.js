import { SEL } from '../selectors';

Cypress.Commands.add('abrirCarrinho', (qtdeEsperada) => {
  cy.get(SEL.menu.carrinho).click();
  cy.url().should('include', '/view_cart');
  cy.get(SEL.carrinho.itens).should('have.length', qtdeEsperada);
});

Cypress.Commands.add('prosseguirParaCheckout', () => {
  cy.contains(SEL.carrinho.finalizar, /proceed to checkout/i).click();
  cy.url().should('include', '/checkout');
});

Cypress.Commands.add('validarEnderecoEPedido', (u, qtdeItens) => {
  [SEL.checkout.enderecoEntrega, SEL.checkout.enderecoCobranca].forEach((endereco) => {
    cy.get(endereco)
      .should('contain.text', u.primeiroNome)
      .and('contain.text', u.sobrenome)
      .and('contain.text', u.endereco)
      .and('contain.text', u.cidade)
      .and('contain.text', u.pais)
      .and('contain.text', u.celular);
  });
  cy.get(SEL.checkout.itens).should('have.length', qtdeItens);
});

Cypress.Commands.add('finalizarPedido', (comentario) => {
  cy.get(SEL.checkout.comentario).type(comentario);
  cy.get(SEL.checkout.fazerPedido).click();
  cy.url().should('include', '/payment');
});

Cypress.Commands.add('preencherPagamento', (p) => {
  cy.get(SEL.pagamento.nomeNoCartao).type(p.nomeNoCartao);
  cy.get(SEL.pagamento.numero).type(p.numero);
  cy.get(SEL.pagamento.cvc).type(p.cvc);
  cy.get(SEL.pagamento.mes).type(p.mes);
  cy.get(SEL.pagamento.ano).type(p.ano);
});

Cypress.Commands.add('confirmarPagamento', () => {
  cy.get(SEL.pagamento.pagar).click();
  cy.url().should('include', '/payment_done');
  cy.validarTexto(SEL.pagamento.pedidoRealizado, 'Order Placed!');
  cy.contains(/your order has been (placed successfully|confirmed)!/i).should('be.visible');
});
