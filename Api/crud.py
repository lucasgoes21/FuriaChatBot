from db import async_session
from model import Message
from sqlalchemy.future import select

async def save_message(sender: str, content: str):
    async with async_session() as session:
        async with session.begin():
            message = Message(sender=sender, content=content)
            session.add(message)

async def get_all_messages():
    async with async_session() as session:
        result = await session.execute(select(Message))
        messages = result.scalars().all()
        return messages
