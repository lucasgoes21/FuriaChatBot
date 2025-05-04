# 🦁 FURIA ChatBot

Um chatbot interativo para fãs da equipe de CS:GO da FURIA, feito com FastAPI, React e GPT-4, integrando scraping em tempo real da HLTV e salvamento de histórico com SQLite.

---

## 🔍 Visão Geral

Este projeto foi desenvolvido como parte de um desafio técnico da FURIA Tech. A proposta consiste em criar uma interface conversacional voltada para fãs do time de CS:GO da FURIA, permitindo interações como:

- Perguntas sobre escalação, próximos jogos e estatísticas
- Interface web customizada com visual inspirado na identidade da FURIA
- Integração com GPT-4 da Azure para gerar respostas contextualizadas
- Scraping da HLTV para fornecer dados reais da equipe
- Armazenamento de mensagens com SQLite para manter o histórico de conversas

---

## ✅ Funcionalidades Implementadas

- 💬 **Chat em tempo real com IA** (GPT-4 via Azure API)
- 📅 **Reconhecimento de palavras-chave** para adaptar o prompt automaticamente (ex: "próximo jogo", "escalação")
- 🔎 **Web scraping da HLTV.org** para obter lineup e eventos
- 🗃️ **Armazenamento de mensagens** usando SQLite com SQLAlchemy async
- 🧠 **Limite de tokens controlado** com `tiktoken` para evitar estouros
- 🌐 **Frontend React + Tailwind** com scroll inteligente e layout responsivo
- 🔁 **Memória do chat baseada no banco de dados**, reutilizando o histórico limitado por tokens

---

## 🧱 Estrutura do Projeto
```shell
📦 FuriaChatBot 
├── api/
│ ├── main.py - FastAPI com endpoints e integração GPT + scraping
│ ├── crud.py - Funções de banco (salvar/buscar mensagens)
│ ├── model.py - Modelo SQLAlchemy da tabela 'messages'
│ ├── db.py - Conexão com SQLite
├── frontend/
│ ├── App.jsx - Componente principal React do chat
│ ├── assets/ - Logos e imagens da interface
├── chat.db - Banco local SQLite (ignorado no Git)
├── .env - Token da Azure (não versionado)
├── .gitignore - Ignora arquivos sensíveis e locais
```

---

## ▶️ Como rodar o projeto

### Backend (FastAPI)

1. Crie o ambiente virtual:
```bash
    python -m venv venv
    source venv/bin/activate  # ou venv\Scripts\activate no Windows
```

2. Instale as dependências:
```bash
    pip install -r requirements.txt
```

3. Crie um arquivo .env com seu token:
```bash
    GITHUB_TOKEN=seu_token_GitHub
```
4. Inicie a API:
```bash
    uvicorn main:app --reload
```

### Frontend (React)

1. Instale as dependências:
```bash
    npm install
```

2. Inicie a aplicação:
```bash
    npm run dev
```

---
## 🛑 Requisitos

- Python 3.10+
- Node.js + npm
- SQLite (vem embutido)
- Conta na Azure OpenAI com acesso ao GPT-4
- Biblioteca tiktoken para cálculo de tokens

# 🧾 Observações
- O banco chat.db está ignorado via .gitignore para evitar versionamento de dados locais.

- A API da HLTV não é oficial. O scraping pode quebrar se a estrutura do site mudar.

- O sistema de tokens foi limitado para evitar estouro de contexto da Azure (máximo: 8000 tokens).

## 🌐 Acesso ao Projeto
Você pode acessar a aplicação hospedada neste link:
🔗 [https://furiachatbot-on2.vercel.app/](https://furiachatbot-on2.vercel.app/)
## ✍️ Autor
Desenvolvido por Lucas Mateus Gonçalves de Góes no desafio técnico da FURIA Tech 2025.
