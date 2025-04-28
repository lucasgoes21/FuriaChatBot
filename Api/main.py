from dotenv import load_dotenv
import cloudscraper
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from bs4 import BeautifulSoup
import os

# Carregar variáveis de ambiente
load_dotenv()

# Inicializar o app FastAPI
app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurações do cliente Azure
endpoint = "https://models.github.ai/inference"
model = "openai/gpt-4.1"
token = os.getenv("GITHUB_TOKEN")

PANDASCORE_API_TOKEN = os.getenv("PANDASCORE_API_TOKEN")


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

player_cards = soup.select('div.playerFlagName')

stats = soup.select('div#achievementsBox.tab-content')
print(stats)
# Rota POST para o chat
@app.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message

    user_message = user_message + "[esse html teoricamente tem tudo que precisa pra responder perguntas sobre o time de cs da furia, pegue info dele]"+ str(stats) + str(player_cards)

    # Verifica se a mensagem do usuário foi fornecida
    if not user_message:
        raise HTTPException(status_code=400, detail="A mensagem do usuário é obrigatória.")


    response = client.complete(
        messages=[
            SystemMessage(""),
            UserMessage(user_message),
        ],
        temperature=0.8,
        top_p=0.1,
        max_tokens=8000,
        model=model
    )
    
    bot_response = response.choices[0].message.content

    return {"response": bot_response}
