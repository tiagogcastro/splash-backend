✅


# Usuário
**RF**
- O usuário deve poder visualizar o perfil de qualquer pessoa;
- O usuário deve poder listar todos os participantes, com excessão do usuário logado;
- O usuário deve poder visualizar seu perfil;


## Cadastro
**RF**
- O usuário deve poder cadastrar informando name, email, password; ✅
- O usuário deve poder cadastrar por telefone (OTP por SMS);


**RNF**
- Usar bycrypt para criptografar a senha enviada pelo usuário;

**RN**
- (telefone) verificar se o código de acesso é válido
- O usuário não deve poder criar uma conta com um e-mail já existente;
- O usuário deverá ter a senha criptografada após a criação da conta;


## Autenticação

**RF**
- O usuário deve poder fazer login na aplicação informando o email ou username com a senha;
- Deve ser possível o usuário logar por telefone (OTP por SMS)/

**RNF**
- Usar JsonWebToken para geração de tokens de autenticação;
- Usar bycrypt para comparar a senha criptografada a senha enviada pelo usuário;

**RN**
- Deve gerar um token de acesso após login;

## Recuperação de Senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail;
- Deve ser possível o usuário recuperar a senha informando o seu telefone;
- (telefone) O usuário deve receber uma mensagem por SMS com o passo a passo para a recuperação da senha;
- (e-mail) O usuário deve receber um e-mail com o passo a passo para a recuperação da senha;
- O usuário deve conseguir inserir uma nova senha;

**RNF**
- Usar twillo para envio do código de acesso (produção e desenvolvimento);
- Usar Ethereal mail para envio de e-mail em desenvolvimento;
- Usar Amazon ses para envio de e-mail em produção;


**RN**
- O usuário precisa informar uma nova senha;
- (e-mail) O link enviado para a recuperação deve expirar em 2 horas;
- (telefone) O código de acessso enviado para a recuperação deve expirar em 2 horas;


# Enviar Patrocínio

