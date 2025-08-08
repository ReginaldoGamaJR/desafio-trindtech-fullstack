 Gerenciador de Cursos e Alunos
Este é um projeto desenvolvido como um desafio técnico, focado na criação de um sistema para gerenciar cursos e alunos. Ele permite o controle completo de matrículas, cadastro de informações e gerenciamento de dados de forma eficiente.

Funcionalidades
.Autenticação:. Login seguro com JSON Web Tokens (JWT).

.Gestão de Alunos:. Cadastrar, atualizar e visualizar informações de alunos.

.Gestão de Cursos:. Criar, visualizar e gerenciar cursos.

.Gestão de Matrículas:. Matricular alunos em cursos, visualizar o status das matrículas e alterá-las.

.Exclusão:. Remover alunos e cursos do sistema.

.---.

Tecnologias Utilizadas
Este projeto foi construído com uma arquitetura de back-end e front-end separados, comunicando-se através de requisições HTTP. O .CORS. (Cross-Origin Resource Sharing) foi implementado no backend para permitir essa comunicação segura entre origens diferentes.

Backend
.Linguagem:. Node.js

.Framework:. Express.js

.Banco de Dados:. PostgreSQL

.ORM:. Sequelize

.Autenticação:. JWT (JSON Web Tokens)

.Validação:. Yup

.Segurança:. CORS

Frontend
.Framework:. React

.Gerenciador de Estado:. Vite

.Estilização:. Bootstrap

.Requisições HTTP:. Axios

.---.

Como Rodar o Projeto
Para executar o projeto, siga os passos abaixo para o backend e o frontend, respectivamente.

1. Configuração do Backend
.Pré-requisitos:.

Node.js e npm

PostgreSQL

.Clone o repositório e navegue até a pasta do backend:.
...bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio/backend
...

.Instale as dependências:.
...bash
npm install
...

.Configure o banco de dados:.

Crie um arquivo .env na raiz da pasta backend.

Preencha as variáveis de ambiente com suas credenciais do PostgreSQL, por exemplo:
...env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=seu_banco
PORT=3001
JWT_SECRET=sua_chave_secreta
...

Execute o script SQL fornecido (dump.sql) no seu banco de dados PostgreSQL para criar a estrutura das tabelas e carregar os dados.

.Inicie o servidor:.
...bash
npm run dev
...
O backend estará rodando em http://localhost:3001.

2. Configuração do Frontend
.Navegue para a pasta do frontend:.
...bash
cd ../frontend
...

.Instale as dependências:.
...bash
npm install
...

.Inicie a aplicação:.
...bash
npm run dev
...
O frontend estará disponível em http://localhost:5173.