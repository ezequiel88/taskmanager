# TaskManager 🚀

### Projeto de Gerenciamento de Tarefas 📝

O TaskManager é uma aplicação de gerenciamento de tarefas desenvolvida para facilitar o controle e organização das suas atividades diárias. Com uma poderosa combinação de tecnologias, incluindo Vue3 no frontend, Laravel 11 no backend e Docker para a infraestrutura, o TaskManager oferece uma experiência eficiente e moderna.

### Pré-requisitos 🛠️

Antes de iniciar a instalação, certifique-se de ter os seguintes softwares instalados em seu sistema:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)
- [Firebase](https://console.firebase.google.com/) (Para atualização em tempo real das tarefas)

Nota: Uma conta do Firebase é necessária para utilizar a funcionalidade de atualização em tempo real das tarefas.

### Passo a Passo para Instalação 🚀

#### 1. Clonar o Repositório

Clone o repositório para a sua máquina local. Abra o terminal e execute:

```sh
git clone <URL_DO_REPOSITORIO>
cd taskmanager
```

#### 2. Configuração do Backend

Navegue até o diretório `backend`:

```sh
cd backend
```

##### 2.1. Arquivo de Ambiente

Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente com as suas configurações:

```sh
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=taskmanager
DB_USERNAME=taskmanager
DB_PASSWORD=Task@Manager

FIREBASE_PROJECT_ID=<seu-projeto-firebase>
FIREBASE_DATABASE_URL=https://<seu-projeto-firebase>.firebaseio.com
FIREBASE_AUTH_TOKEN=1xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### 2.2. Configurações do Backend no Docker (Laravel)

Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute o seguinte comando para criar a infraestrutura:

```sh
docker compose up -d --build
```

Obtenha o nome ou ID do container do Backend:

```sh
docker ps
```

Em seguida, entre no seu container Backend (usando o ID ou o nome do container):

```sh
docker exec -it <ID ou nome do container> bash
```

#### Nota: Os comandos a seguir devem ser executados dentro do container Backend.

#### 2.3. Geração da Chave da Aplicação

Gere a chave da aplicação Laravel:

```sh
php artisan key:generate
```

Execute as migrations para criar as tabelas do banco de dados:

```sh
php artisan migrate
```

Popule a base de dados com os dados iniciais:

```sh
php artisan db:seed
```

#### 3. Configuração do Frontend

Não é necessário alterações pois o docker irá compilar e buildar o projeto.


### Endpoints da API 🌐

- `POST` `api/auth/login` - Autenticação do usuário
- `POST` `api/auth/logout` - Logout do usuário
- `GET|HEAD` `api/tasks` - Listar todas as tarefas
- `POST` `api/tasks` - Criar uma nova tarefa
- `PUT` `api/tasks/{id}` - Atualizar uma tarefa existente
- `DELETE` `api/tasks/{id}` - Deletar uma tarefa existente

### Acessar a Aplicação 🌟

Após iniciar os containers, a aplicação estará disponível nos seguintes endereços:

- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend: [http://localhost:8000](http://localhost:8000)

### Estrutura do Projeto 📂

A estrutura do projeto segue os padrões dos respectivos frameworks:

```
taskmanager/
│
├── backend/                  # Código-fonte do backend
│   ├── app/                  # Diretório principal da aplicação Laravel
│   ├── config/               # Configurações do Laravel
│   ├── database/             # Migrações e seeds do banco de dados
│   ├── routes/               # Arquivos de rotas
│   ├── .env                  # Arquivo de variáveis de ambiente
│   ├── composer.json         # Dependências do Composer
│   └── Dockerfile            # Dockerfile do backend
│   ...
|
│
├── frontend/                 # Código-fonte do frontend
│   ├── public/               # Arquivos públicos
│   ├── src/                  # Código-fonte do Vue
│   ├── package.json          # Dependências do Node.js
│   └── Dockerfile            # Dockerfile do frontend
│   ...
│
├── docker-compose.yml        # Configuração do Docker Compose
└── README.md                 # Documentação do projeto
```

### Comandos Úteis 🛠️

- Para parar os containers:

```sh
docker stop <ID ou nome do contêiner>
```

- Para visualizar os logs dos containers:

```sh
docker logs -f <ID ou nome do container>
```

- Para acessar o terminal do container do backend:

```sh
docker exec -it backend bash
```

- Para acessar o terminal do container do frontend:

```sh
docker exec -it frontend sh
```

### Considerações Finais 🙌

Este guia tem como objetivo fornecer uma instalação simplificada do projeto. Em caso de dúvidas ou problemas, consulte a documentação oficial das tecnologias utilizadas ou entre em contato com o desenvolvedor do projeto.

## Melhorias 🚀

Tudo que está bom pode melhorar! Aqui estão algumas melhorias sugeridas:

- Implementar tratamento de erros robusto no backend e frontend.
- Notificar usuários sobre alterações em tempo real usando Firebase.
- Implementar lógica de refreshToken.
- Criar documentação da API usando Swagger.
- Melhorar a construção das imagens Docker.
- Atualizar a autenticação com Firebase para usar OAuth2.

## Contribuição 🤝

Se você quiser contribuir para o projeto, sinta-se à vontade para fazer um fork e enviar pull requests. Todos os tipos de contribuição são bem-vindos!

## Contato 📧

Para mais informações ou entrar em contato:

- LinkedIn: [@ezequiel_tav](https://www.linkedin.com/in/ezequieltav/)
- E-mail: [reacaosistemas@gmail.com](mailto:reacaosistemas@gmail.com)