import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import select

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL)

async_session = sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

async def get_db():
    async with async_session() as session:
        yield session




async def test_connection():
    try:
        async with engine.begin() as conn:
            await conn.execute(select(1))
        return True
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Could not connect to the database.")