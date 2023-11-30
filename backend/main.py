from fastapi import FastAPI, HTTPException, Depends, status, Path, Response  
from sqlalchemy.orm import Session
from models import UserModel, Base
from schemas import UserCreate, Token, User
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import os
from schemas import Token
from fastapi import Depends, FastAPI, HTTPException
from typing import Any
from typing import Optional, Annotated
from datetime import timedelta
from database import get_db
from fastapi import FastAPI
from routes import router, init_db
from fastapi import Security
from database import engine, test_connection

app = FastAPI()
app.include_router(router)


load_dotenv()






@app.on_event("startup")
async def startup_event():
    await init_db(engine)
    await test_connection()


