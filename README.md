# Challenge-Luiza-Labs

Nesse desafio foi proposto o desenvolvimendo de uma api-Rest. Ela é capaz de realizar um CRUD completo de clientes, cadastro de produtos, e manipulação da lista de produtos favoritos desse cliente.

## 👥 Autor

- Rafael Veríssimo da Silva - [GitHub](https://github.com/RafaelVSs)


### Tecnologias Utilizadas

- Node.js
- Express
- MongoDB
- OnpenApi
- Docker
- docker-compose
- jest
- JWT
- mongoose
- Joi

### 🖥️ Funcionalidades Principais
- Autenticação de clientes
- CRUD de clientes
- Não é possivel um cliente se cadastrar mais de uma vez com o mesmo email
- Inserção e visualização de produtos
- Não é possivel adicionar produtos que não existem na lista de favoritos
- Não é possivel adicionar um produto que ja esteja na lista de favoritos
- Não é possivel um cliente ter duas listas de favoritos

### 🚀 Como Executar

* **Copie o link do repositório (https://github.com/RafaelVSs/desafioLuizaLabs.git)**

    ```
    bash
    git clone https://github.com/RafaelVSs/desafioLuizaLabs.git
    ```

* **Instale as dependências do projeto**
    ```
    bash
    npm install
    ```

* **Configure as variaveis de ambiente no arquivo .env**

* **Suba um container com a imagem do banco de dados**

    ```
    bash
    docker-compose up -d
    ```


* **Iniciar o projeto em modo de Produção:**

    ```bash
    npm start
    ```
    Isso executará o arquivo `server.js` com o comando `node server.js`.

* **Iniciar o projeto em modo de Desenvolvimento:**

    ```bash
    npm run dev
    ```
    Este comando utiliza o flag `--watch` do Node.js para reiniciar automaticamente o servidor sempre que houver alterações no código.

#### 📝 Documentação
**Para acessar a documentação do projeto, basta abrir o navegador e fazer uma requisição para `http://localhost:PORTA_SERVIDOR/api/v1/doc`, ou visualizar pelo arquivo OpenAPI.yaml na raiz do projeto.**

#### Opcional

* **Carregar dados fictícios no banco de dados:**

    ```bash
    npm run seed
    ```
    Este comando irá executar o script de `seed.js` para popular o banco de dados com produtos fictícios.

### Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.