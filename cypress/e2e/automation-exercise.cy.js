import { gerarUsuario } from '../support/factories/usuario';
import { SEL } from '../support/selectors';

describe('Automation Exercise - Trabalho de Conclusão', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
  });

  afterEach(() => {
    cy.excluirContaViaApi(usuario);
  });

  describe('Cadastro e autenticação', () => {
    it('TC01 - Registrar usuário', () => {
      cy.acessarHome();
      cy.abrirLoginCadastro();
      cy.validarTexto(SEL.cadastro.titulo, 'New User Signup!');
      cy.iniciarCadastro(usuario.nome, usuario.email);
      cy.validarTexto('h2', 'Enter Account Information');
      cy.preencherDadosDaConta(usuario);
      cy.get(SEL.cadastro.criarConta).click();
      cy.validarTexto(SEL.cadastro.contaCriada, 'Account Created!');
      cy.get(SEL.cadastro.continuar).click();
      cy.validarUsuarioLogado(usuario.nome);
      cy.excluirContaViaUI();
      cy.get(SEL.cadastro.continuar).click();
    });

    context('com usuário previamente cadastrado', () => {
      beforeEach(() => {
        cy.criarContaViaApi(usuario);
      });

      it('TC02 - Login com e-mail e senha corretos', () => {
        cy.acessarHome();
        cy.abrirLoginCadastro();
        cy.validarTexto(SEL.login.titulo, 'Login to your account');
        cy.fazerLoginViaUI(usuario.email, usuario.senha);
        cy.validarUsuarioLogado(usuario.nome);
        cy.excluirContaViaUI();
      });

      it('TC04 - Logout de usuário', () => {
        cy.acessarHome();
        cy.abrirLoginCadastro();
        cy.validarTexto(SEL.login.titulo, 'Login to your account');
        cy.fazerLoginViaUI(usuario.email, usuario.senha);
        cy.validarUsuarioLogado(usuario.nome);
        cy.fazerLogout();
        cy.url().should('include', '/login');
        cy.validarTexto(SEL.login.titulo, 'Login to your account');
      });

      it('TC05 - Registrar usuário com e-mail já existente', () => {
        cy.acessarHome();
        cy.abrirLoginCadastro();
        cy.validarTexto(SEL.cadastro.titulo, 'New User Signup!');
        cy.iniciarCadastro(usuario.nome, usuario.email);
        cy.validarTexto(SEL.cadastro.erro, 'Email Address already exist!');
      });
    });

    it('TC03 - Login com e-mail e senha incorretos', () => {
      cy.acessarHome();
      cy.abrirLoginCadastro();
      cy.validarTexto(SEL.login.titulo, 'Login to your account');
      cy.fazerLoginViaUI(usuario.email, 'SenhaIncorreta@999');
      cy.validarTexto(SEL.login.erro, 'Your email or password is incorrect!');
    });
  });

  describe('Produtos', () => {
    it('TC08 - Verificar todos os produtos e a página de detalhes', () => {
      cy.acessarHome();
      cy.abrirProdutos();
      cy.validarListaDeProdutos();
      cy.abrirPrimeiroProduto();
      cy.validarDetalhesDoProduto();
    });

    it('TC09 - Pesquisar produto', () => {
      const termo = 'Dress';

      cy.acessarHome();
      cy.abrirProdutos();
      cy.buscarProduto(termo);
      cy.validarResultadosDaBusca(termo);
    });
  });

  describe('Página inicial', () => {
    it('TC10 - Verificar assinatura (subscription) na home', () => {
      cy.acessarHome();
      cy.get(SEL.home.rodape).scrollIntoView();
      cy.validarTexto(SEL.home.tituloRodape, 'Subscription');
      cy.get(SEL.assinatura.email).type(usuario.email);
      cy.get(SEL.assinatura.botao).click();
      cy.validarTexto(SEL.assinatura.sucesso, 'You have been successfully subscribed!');
    });
  });

  describe('Pedidos', () => {
    beforeEach(() => {
      cy.fixture('pagamento').as('pagamento');
    });

    it('TC15 - Realizar pedido: cadastrar antes do checkout', function () {
      cy.acessarHome();
      cy.abrirLoginCadastro();
      cy.criarContaViaUI(usuario);

      cy.abrirProdutos();
      cy.adicionarProdutoAoCarrinho(0);
      cy.adicionarProdutoAoCarrinho(1);
      cy.abrirCarrinho(2);
      cy.prosseguirParaCheckout();
      cy.validarEnderecoEPedido(usuario, 2);
      cy.finalizarPedido('Pedido de teste automatizado - TC15');
      cy.preencherPagamento(this.pagamento);
      cy.confirmarPagamento();

      cy.excluirContaViaUI();
      cy.get(SEL.cadastro.continuar).click();
    });

    it('TC16 - Realizar pedido: login antes do checkout', function () {
      cy.criarContaViaApi(usuario);

      cy.acessarHome();
      cy.abrirLoginCadastro();
      cy.fazerLoginViaUI(usuario.email, usuario.senha);
      cy.validarUsuarioLogado(usuario.nome);

      cy.abrirProdutos();
      cy.adicionarProdutoAoCarrinho(0);
      cy.adicionarProdutoAoCarrinho(1);
      cy.abrirCarrinho(2);
      cy.prosseguirParaCheckout();
      cy.validarEnderecoEPedido(usuario, 2);
      cy.finalizarPedido('Pedido de teste automatizado - TC16');
      cy.preencherPagamento(this.pagamento);
      cy.confirmarPagamento();

      cy.excluirContaViaUI();
      cy.get(SEL.cadastro.continuar).click();
    });
  });
});
