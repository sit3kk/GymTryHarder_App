import ssl
from fastapi import FastAPI
from routes import router, init_db
from database import engine, test_connection
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app = FastAPI()
app.include_router(router)

#ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
#ssl_context.load_cert_chain('cert.pem', keyfile='key.pem')

#app.add_middleware(HTTPSRedirectMiddleware)

#origins = ["*"]

#app.add_middleware(
 #   CORSMiddleware,
 #   allow_origins=origins,
 #   allow_credentials=True,
  #  allow_methods=["*"],
  #  allow_headers=["*"],
#)

@app.on_event("startup")
async def startup_event():
    await init_db(engine)
    await test_connection()

#if __name__ == "__main__":
   #uvicorn.run("main:app", host="0.0.0.0", port=443, ssl_certfile='cert.pem', ssl_keyfile='key.pem')
