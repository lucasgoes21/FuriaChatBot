from dotenv import load_dotenv
import cloudscraper
import requests
import tiktoken
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from bs4 import BeautifulSoup
from crud import save_message, get_all_messages
from model import Base
from db import engine
import os

# Carregar variáveis de ambiente
load_dotenv()

# Inicializar o app FastAPI
app = FastAPI()

# Criar tabelas automaticamente no start
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


    print("Banco de dados inicializado com sucesso.")

async def chat(message):
    await save_message(sender="user", content=message)
    return "ok"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações do cliente Azure
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1-mini"
token = os.getenv("GITHUB_TOKEN")
encoder = tiktoken.get_encoding("cl100k_base")

client = ChatCompletionsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token),
)

# Modelo para a requisição
class ChatRequest(BaseModel):
    message: str

url = 'https://www.hltv.org/team/8297/furia'

# URL do site que você deseja acessar
scraper = cloudscraper.create_scraper()  # cria um navegador fake
furiaHTML = scraper.get(url)
print(furiaHTML)  # Verifica se a requisição foi bem-sucedida (200)
soup = BeautifulSoup(furiaHTML.text, 'html.parser') # Imprime o HTML formatado

# Extrai informações do HTML
player_cards = soup.select('div.playerFlagName')
stats = soup.select('div#achievementsBox.tab-content')
match = soup.select('div#matchesBox.tab-content')
event = soup.select('tr.event-header-cell, tr.team-row, div.empty-state')

# Função para contar tokens
def count_tokens(text):
    return len(encoder.encode(text))

async def chatAI(message):
    # Verifica se a mensagem do usuário foi fornecida
    if not message:
        raise HTTPException(status_code=400, detail="A mensagem do usuário é obrigatória.")

    response = client.complete(
        messages=[
            SystemMessage(""),
            UserMessage(message),
        ],
        temperature=0.8,
        top_p=0.1,
        max_tokens=8000,
        model=model
    )
    
    bot_response = response.choices[0].message.content

    return {"response": bot_response}


def limit_history(messages, max_tokens=100):
    total_tokens = 0
    limited_messages = []

    # Vai adicionando mensagens do fim para o começo (mais recentes primeiro)
    for message in reversed(messages):
        message_tokens = count_tokens(message)
        
        if total_tokens + message_tokens > max_tokens:
            break
        
        limited_messages.append(message)
        total_tokens += message_tokens

    # Como adicionamos ao contrário, inverter de novo
    limited_messages.reverse()
    return limited_messages

# Rota POST para o chat
@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message
    bot_response = ""
    mensagem_usuario = user_message.lower()
    print(mensagem_usuario)

    if any(palavra in mensagem_usuario for palavra in ["jogo", "horário", "agenda", "partida", "jogos", "data"]):
        print("match")
        bot_response = bot_response + str(await chatAI(user_message + "[Ultilize esses dados para responder a pergunta]"  + str(event)))
    
    if any(palavra in mensagem_usuario for palavra in ["time", "escalação","escalaçao","escalacao", "jogadores", "lineup"]):
        print("lineup")
        bot_response = bot_response + str(await chatAI(user_message + "[Ultilize esses dados para responder a pergunta]" + str(player_cards)))
    
    if any(palavra in mensagem_usuario for palavra in ["campeonato", "colocação", "ganhou", "final", "semifinais", "semi", "finais", "semifinal", "major", "LAN", "ranking"]):
        print("stats")
        bot_response = bot_response + str(await chatAI(user_message + "[Ultilize esses dados para responder a pergunta]" + str(stats)))
    
    # Salva a mensagem do usuário no banco de dados
    await save_message(sender="user", content=user_message)

    botMessage = await chatAI(user_message +"[ Ultilize esses dados para responder a pergunta, se nao ouver dados, responda normalmente"+ bot_response+ "]" + " Responda como um Torcedor do time de CS:GO da Furia, em português.")

    # Salva a resposta do bot no banco de dados
    await save_message(sender="bot", content=botMessage["response"])
    
    return botMessage
    