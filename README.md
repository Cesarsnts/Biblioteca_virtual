# BIBLIOTECA VIRTUAL
## Como rodar backend 
     ### 1. Escolha sua Stack (Linguagem e Fremework):
     * Python: Django, Flask;
     * JavaScript/TypeScript: Node.js com Express, NestJS;
     * Java: Scring Boot;
     * PHP: Laravel, Symfony.
     
     #### 2. Instale a Linguagem: 
           * Tenha o Node.js, Python, Java (JDK), etc., instalados no seu computador;
           * Crie o projeto : Crie uma pasta para o seu backend;
               * Inicialize o projeto: 
                   * Node.js: No terminal, npm init -y .
                   * Python : Crie um ambiente virtual (python -m venv env) e ative-o (.\venv\Scripts\activate)

      ## 3. Adicione dependências:
            * Instale o Framework: npm install express;
            * Java (Maven/Gradle): Adicione as dependências no seu pom.xml ou build.gradle.
      * Instale outras bibliotecas: Bancos de dados, autenticação, etc. 

      ## 4. Escreva o Código (Exemplo com Node.js / Express): 
            * Crie um arquivo index.js (ou app.js);
            * Escreva o código básico para criar um servidor e uma rota (endpoint), como mostrado no snippet do Reddit:

*Exemplo :*
    
    const express = require('express');
    const app = express();
    const port = 3000; // Porta que sua aplicação vai rodar
    
    app.get('/', (req, res) => {
      res.send('Olá do Backend!');
    });
    
    app.listen(port, () => {
      console.log(`Servidor backend rodando em http://localhost:${port}`);
    });
    
        * Adicione o comando start no seu package.json: "start": "node index.js".

      ## 5. Rode o Backend 
        * No terminal do projeto, execute npm start ou node index.js (se não tiver o script start)
    Abra seu navegador e acesse http://localhost:3000 para ver "Olá do Backend!
    
