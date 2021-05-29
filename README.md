### **Securança**

**RF**
-  [ㅤ ] Bloquear usuário por 1h, após 10 **requisições consecutivas ( Opcional );

**RNF**
-  [ㅤ ] Utilizar rate-limiter-flexible para **bloquear tentativa de DDoS;
### **Perfil do usuário**

**RF**

- [ㅤ ]  O usuário deve poder visualizar o perfil de qualquer pessoa;
- [✅]  O usuário deve poder seguir ( patrocinar ) outro usuário;
- [ㅤ ]  O usuário deve poder visualizar seu perfil;
- [ㅤ ]  O usuário ( loja ) deve poder visualizar seu perfil com ;
- [ㅤ ]  O usuário deve poder deletar sua conta;
- [ㅤ ]  O usuário deve poder listar quem ele está patrocinando;
- [ㅤ ]  O usuário deve poder atualizar sua conta informando nome, email, e username e senha ser opcional;
- [ㅤ ]  O usuário deve atualizar sua senha informando a senha atual, nova senha e confirmar nova senha;

**RNF**

- [✅]  Utilizar bcryptjs para criptografar a nova senha enviada pelo usuário após a atualização;
- [✅]  Utilizar Twillo para envio do código de acesso ( produção e desenvolvimento );
### **Cadastro**

**RF**

- [✅]  O usuário deve poder cadastrar informando nome, e-mail, senha;
- [✅]  O usuário deve poder cadastrar por telefone ( OTP por SMS );
- [ㅤ ]  O usuário deve poder aceitar os termos;
- [✅]  Validar o número de telefone;
- [ㅤ ]  Verificar o Código de Patrocínio enviado ( obrigatório para cadatro );

**RNF**

- [✅]  Utilizar bcryptjs para criptografar a senha enviada pelo usuário;
- [✅]  Utilizar Twillo para envio do código de acesso ( produção e desenvolvimento );

**RN**

- [✅]  O usuário não deve poder criar uma conta com um e-mail já existente;
- [✅]  O usuário deverá ter a senha criptografada após a criação da conta;
### **Autenticação**

**RF**

- [ㅤ ]  O usuário deve poder fazer login por telefone ( OTP por SMS );
- [ㅤ ]  O usuário deve poder login com e-mail ou username;
- [ㅤ ]  O usuário não deve poder criar uma conta com um telefone inválido;
- [ㅤ ]  O usuário deve pode enviar o código após 3 minutos;
- [ㅤ ]  Verificar se o usuário existe para autenticação;

**RNF**

- [ㅤ ]  Utilizar jsonwebtoken para geração de tokens de autenticação;
- [✅]  Utilizar bcryptjs para comparar a senha criptografada com a senha enviada pelo usuário;

**RN**

- [ㅤ ]  Deve gerar um token de acesso após login;
### **Recuperação de Senha**

**RF**

- [ㅤ ]  Deve ser possível o usuário recuperar a senha informando o e-mail;
- [ㅤ ]  Deve ser possível o usuário recuperar a senha informando o seu telefone;
- [ㅤ ]  O usuário deve receber um e-mail com o passo a passo para a recuperação da senha;
- [ㅤ ]  O usuário deve conseguir inserir uma nova senha;

**RNF**

- [ㅤ ]  Utilizar Twillo para envio do código de acesso (produção e desenvolvimento);
- [ㅤ ]  Utilizar Ethereal mail para envio de e-mail em desenvolvimento;
- [ㅤ ]  Utilizar Amazon SES para envio de e-mail em produção;

**RN**

- [ㅤ ]  O usuário precisa informar uma nova senha;
- [ㅤ ]  O link enviado para a recuperação deve expirar em 2 horas;
### **QR Code**

**RF**

- [ㅤ ]  Deverá ser possível criar um QR Code;
- [ㅤ ]  O usuário poderá ler o QR Code;

**RNF**

- [ㅤ ]  Utilizar qr-image para poder ler ou criar um QR Code;

### **Feed**

**RF**

- [ㅤ ]  O usuário deve poder listar patrocínios que ele Recebeu;
- [ㅤ ]  O usuário deve poder listar patrocínios que ele Enviou;
- [ㅤ ]  As atualizações será agrupadas por usuário;

**RNF**

- [ㅤ ]  Utilizar [socket.io](http://socket.io) para atualizar em realtime as notificações;
- [ㅤ ]  Utilizar MongoDB para notificações;
### **Saldo**

**RF**

- [ㅤ ]  O usuário deve poder visualizar seu saldo total;
- [ㅤ ]  O usuário deve poder visualizar seu saldo disponível para saque;
- [ㅤ ]  O usuário deve poder visualizar seu saldo por loja;

**RN**

- [ㅤ ]  O usuário deve poder efetuar pagamento para uma loja com saldo disponível;
- [ㅤ ]  O usuário deve poderá usar livremente seu saldo disponível;
### **Patrocínios**
### Enviar Patrocínio

**RF**

- [ㅤ ]  O usuário deve poder definir o valor do patrocínio;
- [ㅤ ]  O usuário ( Loja ) poderá permitir saque;
- [ㅤ ]  Validar se o valor enviado é um double;
- [ㅤ ]  O usuário deve poder pesquisar pelo nome do usuário que ele estiver patrocinando ( Opcional );
- [ㅤ ]  O usuário deve poder listar os usuário que ele estiver patrocinando;

**RN**

- [ㅤ ]  O usuário não poderá patrocinar a sí mesmo;
- [ㅤ ]  O valor enviado ao usuário deve ser entre R$ 1,00 - R$ 500,00;
