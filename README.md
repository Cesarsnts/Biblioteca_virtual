
# BIBLIOTECA VIRTUAL 
     
A biblioteca virtual serve para tornar o acesso aos livros e materiais de estudo mais simples e rápido. Com ele, é possível o 
pesquisar, ler e consultar conteúdos pela internet, sem precisar ir até uma biblioteca física. Além disso, o sistema ajuda a organizar
o acervo e facilita a busca por informações, contribuindo para o aprendizado e o hábito da leitura de forma prática e acessível. 

## Como rodar backend 

### 1. Escolha sua Stack (Linguagem e Fremework):
- Python: Django, Flask;
- JavaScript/TypeScript: Node.js com Express, NestJS;
- Java: Scring Boot;
- PHP: Laravel, Symfony.
     
### 2. Instale a Linguagem: 
- Tenha o Node.js, Python, Java (JDK), etc., instalados no seu computador;
     - Crie o projeto
     - Crie uma pasta para o seu backend;
     - Inicialize o projeto: 
     - Node.js: No terminal, `npm init -y`.
     - Python : Crie um ambiente virtual `python -m venv env` e ative-o `.\venv\Scripts\activate`

### 3. Adicione dependências:
- Instale o Framework: `npm install express`;
- Java (Maven/Gradle): Adicione as dependências no seu pom.xml ou build.gradle.
- Instale outras bibliotecas: Bancos de dados, autenticação, etc. 

### 4. Escreva o Código (Exemplo com Node.js / Express): 
- Crie um arquivo index.js (ou app.js);
- Escreva o código básico para criar um servidor e uma rota (endpoint);
- Adicione o comando start no seu package.json: "start": "node index.js".

### 5. Rode o Backend 
- No terminal do projeto, execute `npm start` ou `node index.js` (se não tiver o script start).

## Como rodar front end 

### 1. Para projetos simples (HTML, CSS, Java Script):
- *Abra o arquivo* : Clique com o botão direito no seu arquivo `index.html`;
- Em seguida, selecione "Abrir com" > [Seu Navegador] ;
- No VS Code, instale a extensão Live Server. Ela cria um servidor local que atualiza a página automaticamente ao salvar;
- Este vídeo demonstra como rodar um projeto front-end simples com HTML/CSS/JS: https://youtu.be/MFTriNiKOLI.

### 2. Para Projetos modernos (React, Vue, Vite, Tailwind, etc.):
- Esses projetos exigem o ambiente Node.js instalado na máquina;
- *Terminal* : Abra o terminal dentro da pasta do projeto no VS Code;
- *Instale Dependências* : Execute o comando `npm install`ou `npm i` para baixar as bibliotecas necessárias;
- *Rodar Servidor* : Execute `npm run dev` ou `npm start` para iniciar o servidor de desenvolvimento;
- *Acessar* : O terminal indicará um endereço. geralmente `http://localhost:3000 `;
- Este vídeo demonstra como rodar um projeto React e instalar de dependencias : https://youtu.be/_gHr2Pe5LCY

## Lista de endpoints 

- GET /items
 -> Lista todos os livros cadastrados no sistema.

- GET /items?tipo=livro
-> Lista os livros filtrando pelo tipo.

- GET /items?status=ativo
-> Lista os livros filtrando pelo status (ativo, lido ou arquivado).

- POST /items
-> Cadastra um novo livro na biblioteca.

- PUT /items/{id}
-> Atualiza todas as informações de um livro específico.

- PATCH /items/{id}/status
-> Atualiza apenas o status de um livro.

- DELETE /items/{id}
-> Remove um livro do sistema.

## Regras de Validação 

- Regras de Validação do Sistema -> 
Para garantir a integridade dos dados e o correto funcionamento do sistema de gestão de bibliotecas pessoais, foram implementadas regras de validação tanto no frontend quanto no backend, assegurando consistência das informações e melhor experiência ao usuário.

- Validação do título -> 
O campo título é obrigatório e deve conter, no mínimo, 3 (três) caracteres. Essa regra evita o cadastro de registros incompletos ou inválidos.

- Validação do tipo -> 
O campo tipo é obrigatório e aceita apenas o valor "livro", conforme a definição do escopo do sistema. Qualquer valor diferente é rejeitado pelo backend.

- Validação do status -> 
O campo status é obrigatório e deve assumir exclusivamente um dos seguintes valores: "ativo", "lido" ou "arquivado". Essa restrição garante a padronização do estado dos livros cadastrados.

- Validação da data -> 
Quando informada, a data associada ao livro deve seguir obrigatoriamente o formato YYYY-MM-DD. Datas em formatos diferentes são consideradas inválidas.

- Validação de campos obrigatórios -> 
Os campos essenciais para o cadastro de um livro (título, tipo e status) devem estar presentes na requisição. Caso algum deles esteja ausente, a operação é interrompida e uma mensagem de erro é retornada.

- Validação do identificador (ID) -> 
Para operações de atualização ou exclusão (PUT, PATCH e DELETE), o ID do livro deve existir no sistema. Caso contrário, a API retorna erro informando que o registro não foi encontrado.

- Validação de dados duplicados -> 
O sistema evita inconsistências ao garantir que cada livro possua um identificador único, impedindo conflitos durante as operações de leitura, atualização e remoção.
