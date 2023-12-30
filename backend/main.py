from fastapi import FastAPI, HTTPException, Depends, status, Request
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv
import ssl
import uvicorn

from routes import router, init_db
from database import engine, test_connection


app = FastAPI()
app.include_router(router)

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('cert.pem', keyfile='key.pem')

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, ssl_certfile='cert.pem', ssl_keyfile='key.pem')


#uvicorn main:app --ssl-keyfile key.pem --ssl-certfile cert.pem

load_dotenv()

#@app.on_event("startup")
#async def startup():
    #await test_connection()

#@app.on_event("shutdown")
#async def shutdown():
   # await engine.dispose()

'''
@app.middleware("http")
async def redirect_to_https(request: Request, call_next):
    if request.url.scheme == "http":
        url = request.url.replace(scheme="https", port=443)
        return RedirectResponse(url)
    return await call_next(request)
'''


@app.on_event("startup")
async def startup_event():
    await init_db(engine)
    await test_connection()


