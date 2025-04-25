# Documentação do Projeto FuriaBot

## Visão Geral
O FuriaBot é um chatbot desenvolvido para fornecer informações e interagir com fãs do time de eSports FURIA. Ele oferece funcionalidades como consulta de próximos jogos, status ao vivo, resultados recentes, elenco atual, notícias, histórico de conquistas, curiosidades, memes e respostas personalizadas com uma personalidade "fanboy".

## Funcionalidades Implementadas

### Essencial (MVP)
- **Próximos Jogos**: Exibe data, hora e adversário dos próximos jogos da FURIA.
- **Status ao Vivo**: Responde se a FURIA está jogando no momento.
- **Últimos Resultados**: Mostra os resultados mais recentes dos jogos da FURIA.
- **Elenco Atual**: Lista os jogadores atuais do time de CS:GO.
- **Últimas Notícias**: Integração com um feed de notícias para exibir atualizações sobre a FURIA.

### Funcionalidades Adicionais
- **Histórico de Conquistas**: Apresenta os principais títulos e conquistas do time.
- **Trivia/Quiz**: Oferece curiosidades e perguntas sobre a FURIA para os usuários.
- **Memes e Clips Icônicos**: Links para memes e clipes famosos relacionados ao time, incluindo conteúdo do Gaules.
- **Respostas Engraçadas**: Respostas com uma personalidade "fanboy" para interagir de forma divertida com os usuários.

## Stack Utilizada
- **Frontend**: React.js com Tailwind CSS para uma interface moderna e responsiva.
- **Backend (API)**: Python com FastAPI para gerenciar as funcionalidades e integrações.
- **Chatbot**: Integração com a API do DeepSeek para respostas inteligentes.
- **Banco de Dados**: PostgreSQL para armazenamento de dados dinâmicos e persistentes.

## Requisitos do Sistema
- **Linguagem**: Python (Backend) e JavaScript (Frontend).
- **Dependências**: React.js, Tailwind CSS, FastAPI, PostgreSQL, API do DeepSeek.
- **Ambiente**: Sistema operacional compatível com as ferramentas acima e acesso à internet para APIs externas.

## Instalação
1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/FuriaChatBot.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd Api
    ```
3. Instale as dependências do backend:
    ```bash
    pip install -r requirements.txt
    ```
4. Navegue até o diretório do projeto:
    ```bash
    cd..
    cd Front
    ```
3. Instale as dependências do Frontend:
    ```bash
    npm install
    ```
6. Configure o banco de dados PostgreSQL e as variáveis de ambiente necessárias.

## Uso
1. Inicie o backend:
    ```bash
    uvicorn app.main:app --reload
    ```
2. Inicie o frontend:
    ```bash
    npm start
    ```
3. Acesse a interface do FuriaBot no navegador e interaja com o chatbot.

## Contribuição
- Faça um fork do repositório.
- Crie uma branch para suas alterações:
    ```bash
    git checkout -b minha-branch
    ```
- Envie um pull request com suas contribuições.

## Licença
Este projeto está licenciado sob a [Licença MIT](LICENSE).