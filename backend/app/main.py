from fastapi import FastAPI
from app.api.endpoints import user, token

app = FastAPI()

app.include_router(user.router)
app.include_router(token.router)



