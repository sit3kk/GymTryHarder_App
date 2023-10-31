from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: str
    full_name: str = None
    email: str = None
    disabled: bool = None

class UserInput(BaseModel):
    username: str
    email: str
    password: str
    full_name: Optional[str] = None


class UserInDb(User):
    hashed_password: str