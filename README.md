<h1 align="center"> Lavimco - mvp backend </h1>

<p align="center">🔍 Navegação dentro do Readme. </p>

<div align="center">

  [![](https://img.shields.io/badge/-Sobre-5276f2)](#sobre-o-projeto)
  [![](https://img.shields.io/badge/-Tecnologias-5276f2)](#techs)
  [![](https://img.shields.io/badge/-Começando-5276f2)](#rodar-projeto)
  [![](https://img.shields.io/badge/-Contribuir-5276f2)](#contribuir)
  [![](https://img.shields.io/badge/-Rotas-5276f2)](#rotas)
  [![](https://img.shields.io/badge/-Licença-5276f2)](#license)

</div>

</br></br>

<div align="left">
  <h1 id="sobre-o-projeto"> ✅ Sobre o projeto </h1>
  <p>
    Backend do app(lavimco) de patrocínios, na qual usuários podem receber patrocínios de lojas em um objetivo de melhorar o sistema de fidelidade entre clientes.
  </p>
</div>

</br>

___

<div align="left"> 
  <h1 id="techs">🚀 Tecnologias Utilizadas </h1> 
  <p>
    Utilizando o VsCode para fazer os códigos em NodeJS e Typescript. 
    </br>
    O Insominia é para testar a api feita.
    </br>
    Utiliza o Typeorm, então da para conectar com diversos bancos de dados.
    </br>
    Utilizando o Docker para ajudar na conexão com o banco de dados PostgresSQL.
  </p>
  <div>
    <p>
      ➡
      <a href="https://nodejs.org/en/"> NodeJS</a>
    </p>
    <p>
      ➡
      <a href="https://www.typescriptlang.org"> Typescript</a>
    </p>
    <p>
      ➡
      <a href="https://www.typescriptlang.org"> PostgresSQL</a>
    </p>
    <p>
      ➡
      <a href="https://insomnia.rest"> Insominia</a>
    </p>
    <p>
      ➡
      <a href="https://www.docker.com"> Docker</a>
    </p>
    <p>
      ➡
      <a href="https://code.visualstudio.com"> VsCode</a>
    </p>
  </div>
</div> 

</br>

___

<div align="left">
  <h1 id="rodar-projeto">💻 Como rodar o projeto na sua máquina da forma que rodei na minha</h1>
  <p>➡ Instalar o NodeJS na sua máquina. <p>

  <p>➡ Vá no cmd dele(no Vscode o nome é "terminal") ou abra o cmd da sua máquina, digite e execute: </p>
  <p> 

    git clone https://github.com/Tiaguin061/CRUD-basico
  </p>
  <p>➡ Entre na pasta do projeto(a que acabou de clonar), digite e execute: </p>
  <p>

    yarn
  </p>
  <p>➡ Para ver os comandos disponíveis e dependências instaladas, vá no arquivo package.json. </p>
  
  </br>

  <strong>Muito importante:</strong>
  <p>
    Siga esta documentação que criei para você conseguir configurar o docker e dbBevear como eu crio na minha máquina.
    <a target="_blank" href="https://www.notion.so/Configura-o-b-sica-do-docker-e-dbBeaver-3d0807f69f5b44c68810fd9dc3a1844a"> Clique aqui! </a>

  </br>

  <p> Por fim, para iniciar o servidor, vá em seu editor de código e vá no cmd dele(no Vscode o nome é "terminal") ou abra o cmd da sua máquina, digite e execute: </p>
  <p>

    yarn dev:server 
  </p>
  <p>❤ Pronto, seu projeto está certinho para funcionar.</p>
  <p> Algum erro? Contate-me. </p>
</div>

</br>

___


<div align="left">
  <h1 id="rotas">🔗 Como utilizar as rotas do projeto</h1>

  <h1>Users</h1>

  post - '/users' -
    
  - Cria um usuário pelo e-mail informando:
    - name?: string (max 30 caracter)
    - username?: string (max 30 caracter)
    - email: string
    - password: string
    - isShop: boolean (botão switch)
    - sponsorship_code?: string 
    - terms: boolean

  Obs: O isShop é para verificar se é uma loja(true) ou um usuário qualquer(false). <br/>
  Obs²: O sponsorship_code é o código de patrocínio, e se for isShop: true, o código de patrocínio não é obrigatório, pois a conta a ser criada é uma loja.

  <h1> </h1>

  get - '/users/balance-amount'

  - Mostra o saldo do usuário logado.
    - user_id: string;  
  
  Obs: Id do usuário logado.
  
  <h1> </h1>

  post - '/users/sms/send-code'

  - Informa o número de celular para receber um código sms para usar na proxíma tela
    - phone_number: string

  <h1> </h1>

  post '/users/sms'

  - Informa o código recebido após informar o número de celular
    - code: String;

  <h1> </h1>

  post - '/users/qrcode'

  - ❎ Falta informar

  ___

  <h1>Profile</h1>
  
  get - '/profile/:username'
    
  - Vai até o perfil de algum usuário informando o username como parâmetro.

  <h1> </h1>

  put - '/profile/'

  - Atualiza o perfil do usuário logado informando:
    - user_id: string
    - username: string
    - email?: string
    - old_password?: string
    - password?: string 
    - password_confirmation?: string
    - name? string <br/>

  Obs: user_id é o id do usuário logado.
  Obs²: Se informar o old_password, é necessário informar os 2 outros campos abaixo.
  Obs³: Se informar o password, é necessário a password_confirmation ser igual.

  <h1> </h1>

  put - '/users/add-email'

  - Adiciona e-mail e senha caso não exista nenhum e-mail ou senha na conta do usuário logado.
    - email: string
    - password: string
    - password_confirmation: string

  Obs: Se informar o password, é necessário a password_confirmation ser igual.

  <h1> </h1>

  patch - '/profile/avatar'

  - user_id: string
  - avatarFileName: string

  Obs: user_id é o id do usuário logado.
  Obs²: O avatar é request.file

  <h1> </h1>

  delete - '/profile/'
  
  - Deleta o perfil do usuário logado.
    - user_id: string

  Obs: user_id é o id do usuário logado.

  ___

  <h1>Session</h1>
  
  post - '/sessions/'
    
  - Loga o usuário informando:
    - email: string
    - password: string

  Obs: Retorna o usuário e o token jwt após logar.

  <h1> </h1>

  post - '/sessions/sms'

  - Informa o código recebido após informar o número de celular
    - code: String;

  ___
 
  <h1>sponsorships</h1>
  
  get - '/sponsored/me'

  - Pesquisa um usuário que eu patrocino
    - username: string
    - sponsor_id: string

  Obs: ❎ Não está finalizada. Não precisa fazer.

  <h1> </h1>

  get - '/sponsored'
    
  - Lista o saldo total de cada loja que me enviou patrocinio.
    - user_id: string

  Exemplo: Loja A me enviou 50,00 2x, então deve listar está loja com o valor de 100,00(saldo total da loja).

  <h1> </h1>

  get - '/sponsorship-code'

  - Somente cria um código de patrocínio </br>
  - Precisa criar o código de patrocínio primeiro para depois usar a rota de qrcode
    - sponsor_user_id: string
    - user_recipient_id?: string
    - allow_withdrawal_balance: boolean
    - amount: number


  Obs: O sponsor_user_id é o usuário logado. <br/>
  Obs²: O allow_withdrawal_balance é para se vai permitir usar este saldo livremente ou não.

  ___

  <h1>notifications</h1>
  
  get - '/notifications/sponsorships-history/:sender_id'
    
  - Lista o histórico de notificações entre 2 usuários(quando clica no usuário la no feed)
    - user_id: string
    - sender_id: string

  Obs: O sponsor_user_id é o usuário logado. <br/>
  Obs²: sender_id é o usuário que eu quero ver o histórico entre nós 2. 

  <h1> </h1>

  get - '/notifications/sponsorships'

  - Lista todos as notificações no feed, porém só mostra a última notificação enviada de algum outro usuário(como se fosse o whatsapp).
  
  <h1> </h1>

  get - '/notifications/send-notifications-for-ios'

  - ❎ Falta informar.

  ___

 <h1>whats</h1>
  
  post - '/whats/'
    
  - ❎ Falta informar.

</div>

</br>

___

<div align="left">
  <h1 id="contribuir">🔗 Como contribuir com o projeto</h1>
  <div>
    <p> 1° - Faça um Fork do repositório; </p>
    <p> 2° - Clone o seu repositório; </p>
    <p> 3° - Crie uma branch com a sua feature; </p>
    <p> 4° - Faça um commit bem descritivo com suas mudanças; </p>
    <p> 5° - Dê 'Push' a sua branch; </p>
    <p> 6° - Ir em Pull Requests do projeto original e criar uma pull request com o seu commit; </p>
    <p>
     ➡ Caso tenha dúvidas sobre como criar um pull request, 
      <a 
        href="https://docs.github.com/pt/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request"> clique neste link.
      </a>  
    </p>
  </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> f81de3d6dd1db750105a504aca5545644db04bda
</div>

</br>

___

<div align="left">
  <h1 id="rede-social">📱 Minhas redes sociais</h1>
  <p> Eu me chamo Tiago Gonçalves, abaixo deixo os links das minhas principais redes na qual participo.
  </p>

  [![](https://img.shields.io/badge/-Github-434140)](https://github.com/Tiaguin061)
  [![](https://img.shields.io/badge/-Linkedin-3DC3C9)](https://www.linkedin.com/in/tiagogoncalves200428/)
  [![](https://img.shields.io/badge/-Instagram-EA3C7A)](https://www.instagram.com/tiaguinho_gon1/?hl=pt-br)
  [![](https://img.shields.io/badge/-Discord-5276f2)](https://discord.com/users/586186122611130368)

</div>

<div align="left">
  <h1 id="license">✔ Licença</h1>
  <p>  Este projeto está sobre Licença MIT, veja: 

  [![](https://img.shields.io/badge/-✔Licença-3CEA5A)]()

<<<<<<< HEAD
>>>>>>> 7c88d970f5d5c14f45b5a24600d9fb4612abb647
=======
>>>>>>> f81de3d6dd1db750105a504aca5545644db04bda
</div>