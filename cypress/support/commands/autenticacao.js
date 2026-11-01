import { SEL } from '../selectors';

Cypress.Commands.add('abrirLoginCadastro', () => {
  cy.get(SEL.menu.loginCadastro).click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('iniciarCadastro', (nome, email) => {
  cy.get(SEL.cadastro.nome).type(nome);
  cy.get(SEL.cadastro.email).type(email);
  cy.get(SEL.cadastro.botao).click();
});

Cypress.Commands.add('preencherDadosDaConta', (u) => {
  cy.get(u.titulo === 'Mrs' ? SEL.cadastro.generoMrs : SEL.cadastro.generoMr).check();
  cy.get(SEL.cadastro.senha).type(u.senha, { log: false });
  cy.get(SEL.cadastro.dia).select(u.diaNasc);
  cy.get(SEL.cadastro.mes).select(u.mesNasc);
  cy.get(SEL.cadastro.ano).select(u.anoNasc);
  cy.get(SEL.cadastro.newsletter).check();
  cy.get(SEL.cadastro.ofertas).check();

  cy.get(SEL.cadastro.primeiroNome).type(u.primeiroNome);
  cy.get(SEL.cadastro.sobrenome).type(u.sobrenome);
  cy.get(SEL.cadastro.empresa).type(u.empresa);
  cy.get(SEL.cadastro.endereco).type(u.endereco);
  cy.get(SEL.cadastro.endereco2).type(u.endereco2);
  cy.get(SEL.cadastro.pais).select(u.pais);
  cy.get(SEL.cadastro.estado).type(u.estado);
  cy.get(SEL.cadastro.cidade).type(u.cidade);
  cy.get(SEL.cadastro.cep).type(u.cep);
  cy.get(SEL.cadastro.celular).type(u.celular);
});

Cypress.Commands.add('criarContaViaUI', (u) => {
  cy.iniciarCadastro(u.nome, u.email);
  cy.validarTexto('h2', 'Enter Account Information');
  cy.preencherDadosDaConta(u);
  cy.get(SEL.cadastro.criarConta).click();
  cy.validarTexto(SEL.cadastro.contaCriada, 'Account Created!');
  cy.get(SEL.cadastro.continuar).click();
  cy.validarUsuarioLogado(u.nome);
});

Cypress.Commands.add('fazerLoginViaUI', (email, senha) => {
  cy.get(SEL.login.email).type(email);
  cy.get(SEL.login.senha).type(senha, { log: false });
  cy.get(SEL.login.botao).click();
});

Cypress.Commands.add('validarUsuarioLogado', (nome) => {
  cy.contains(SEL.menu.usuarioLogado, /logged in as/i)
    .should('be.visible')
    .find('b')
    .should('have.text', nome);
});

Cypress.Commands.add('excluirContaViaUI', () => {
  cy.get(SEL.menu.excluirConta).click();
  cy.validarTexto(SEL.cadastro.contaExcluida, 'Account Deleted!');
});

Cypress.Commands.add('fazerLogout', () => {
  cy.get(SEL.menu.logout).click();
});
