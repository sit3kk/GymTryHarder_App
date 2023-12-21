import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from security import oauth2_scheme
from models import UserModel

from getpass import getpass


