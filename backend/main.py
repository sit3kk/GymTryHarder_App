from fastapi import FastAPI
from routes import router, init_db
from database import engine, test_connection
import uvicorn

app = FastAPI()
app.include_router(router)

@app.on_event("startup")
async def startup_event():
    await init_db(engine)
    await test_connection()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=80, ssl_certfile='cert.pem', ssl_keyfile='key.pem')
