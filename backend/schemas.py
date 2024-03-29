from pydantic import BaseModel
from typing import Optional
from models import BodyPart

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    scopes: list[str] = []

class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    full_name: Optional[str] = None
    photo: Optional[str] = None
    height: Optional[int] = None
    weight: Optional[int] = None

class User(BaseModel):
    id: Optional[int] = None
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    photo: Optional[str] = None
    height: Optional[int] = None
    weight: Optional[int] = None
    following_count: int = 0
    followers_count: int = 0

class UserInDb(User):
    hashed_password: str


class JsonData(BaseModel):
    jsonData: str

