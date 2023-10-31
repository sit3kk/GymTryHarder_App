from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from ...models.token import Token
from ...services.auth import authenticate_user, create_access_token
from datetime import timedelta
from .user import fake_db
from decouple import config

ACCESS_TOKEN_EXPIRE_MINUTES = config('ACCESS_TOKEN_EXPIRE_MINUTES', default=30, cast=int)

# If fake_db and ACCESS_TOKEN_EXPIRE_MINUTES are not defined in this module, 
# ensure you import them. For now, I'm adding a placeholder import:
# from your_module import fake_db, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, 
                            detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
