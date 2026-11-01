import 'cypress-mochawesome-reporter/register';
import './commands';

Cypress.on('uncaught:exception', () => false);

beforeEach(() => {
  cy.intercept(
    {
      url: /(googlesyndication|doubleclick|googleadservices|adservice\.google|googletagservices|adsbygoogle)/,
    },
    { statusCode: 200, body: '' }
  );
});
