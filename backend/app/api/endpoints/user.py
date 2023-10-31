from fastapi import APIRouter, Depends, HTTPException, status
from app.models.user import User, UserInput
from app.services.auth import get_current_active_user, authenticate_user, get_password_hash

router = APIRouter()

# For demonstration purposes, let's define a fake_db here
fake_db = {}

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.get("/users/me/items")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": 1, "owner": current_user.username}]  # assuming User model has a username attribute

@router.post("/register/", response_model=User)
async def register_user(user_input: UserInput):
    if user_input.username in fake_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = get_password_hash(user_input.password)
    
    fake_db[user_input.username] = {
        "username": user_input.username,
        "full_name": user_input.full_name,
        "email": user_input.email,
        "hashed_password": hashed_password,
        "disabled": False
    }
    
    return fake_db[user_input.username]
