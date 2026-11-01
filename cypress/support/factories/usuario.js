import { faker } from '@faker-js/faker';

export function gerarUsuario() {
  const primeiroNome = faker.person.firstName();
  const sobrenome = faker.person.lastName();
  const unico = `${Date.now()}${faker.string.alphanumeric(5).toLowerCase()}`;

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `qa.${unico}@teste.com`,
    senha: 'Senha@12345',
    titulo: 'Mr',
    diaNasc: '10',
    mesNasc: '5',
    anoNasc: '1990',
    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    endereco2: faker.location.secondaryAddress(),
    pais: 'Canada',
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.location.zipCode('#####'),
    celular: faker.string.numeric(10),
  };
}
