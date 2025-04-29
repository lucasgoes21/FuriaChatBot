from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String, nullable=False)  # "user" ou "bot"
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)