const lerJson = (body) => (typeof body === 'string' ? JSON.parse(body) : body);

Cypress.Commands.add('criarContaViaApi', (usuario) => {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.titulo,
      birth_date: usuario.diaNasc,
      birth_month: usuario.mesNasc,
      birth_year: usuario.anoNasc,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.endereco2,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular,
    },
  }).then(({ body }) => {
    expect(lerJson(body).responseCode, 'conta criada via API').to.eq(201);
  });
});

Cypress.Commands.add('excluirContaViaApi', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    failOnStatusCode: false,
    body: { email: usuario.email, password: usuario.senha },
  });
});
