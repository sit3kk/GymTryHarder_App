from fastapi import APIRouter, FastAPI, HTTPException, Depends, status, Query
from models import UserModel, Base, WorkoutModel
from schemas import User, UserCreate, JsonData
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from factories import PlanFactory, UserFactory
from security import authenticate_user, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Optional, Annotated, Any, List
from schemas import Token
from fastapi import Security
from database import engine, test_connection
from dotenv import load_dotenv
import os
from security import get_current_active_user
from sqlalchemy import select
from security import get_password_hash, get_user_by_id
from database import async_session
#from models import ExerciseModel, Training, SeriesModel
#from schemas import TrainingCreate, TrainingExerciseAdd, ExerciseCreate, ExerciseSeriesAdd
import json
from utils import get_all_user_plans, get_all_user_workouts,log_login_attempt

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = 30


router = APIRouter()

async def init_db(engine):
    async with engine.begin() as conn:
       # await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)

  
    async with async_session() as session:

        # Create a default superuser account
        default_admin_username = os.getenv("DEFAULT_ADMIN_USERNAME")
        default_admin_password = await get_password_hash(os.getenv("DEFAULT_ADMIN_PASSWORD"))  
        
        result = await session.execute(select(UserModel).where(UserModel.username == default_admin_username))
        admin_exists = result.scalars().first()

        if not admin_exists:
            default_admin = UserModel(username=default_admin_username, hashed_password=default_admin_password, is_superuser=True)
            session.add(default_admin)
            await session.commit()

   
@router.post("/register", response_model=User)
async def register_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    user_created = await UserFactory.create_user(db, user)
    if user_created is None:
        raise HTTPException(status_code=400, detail="Username already exists or error occurred")
    return user_created



@router.post("/token", response_model=Token)
@log_login_attempt
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: AsyncSession = Depends(get_db)
):
    user = await authenticate_user(db, form_data.username, form_data.password)

    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(
        data={"sub" : user.username, "scopes" : form_data.scopes},
        expires_delta=access_token_expires,
    )

    return {"access_token" : access_token, "token_type" : "bearer"}

@router.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Security(get_current_active_user, scopes=["items"])]
):
    return [{"owner": current_user.username}]

@router.post("/users/{username}/follow")
async def follow_user(username: str, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    # Prevent users from following themselves
    if current_user.username == username:
        raise HTTPException(status_code=400, detail="Cannot follow yourself")

    # Asynchronously fetch the user to follow by username
    result = await db.execute(select(UserModel).where(UserModel.username == username))
    user_to_follow = result.scalars().first()

    if not user_to_follow:
        raise HTTPException(status_code=404, detail="User not found")

    # Asynchronously load the 'following' relationship
    await db.refresh(current_user, attribute_names=["following"])

    # Check if the user is already being followed
    if user_to_follow in current_user.following:
        raise HTTPException(status_code=400, detail="Already following this user")

    # Add the user to the current user's following list
    current_user.following.append(user_to_follow)
    current_user.following_count += 1  # Increment the following count
    user_to_follow.followers_count += 1  # Increment the followed user's followers count

    # Commit the changes to the database
    db.add(current_user)
    db.add(user_to_follow)
    await db.commit()

    return {"message": f"You are now following {username}"}

@router.get("/users/me/following")
async def list_following(db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    # Asynchronously load the 'following' relationship
    await db.refresh(current_user, attribute_names=["following"])

    # Extract usernames of the followed users
    following_usernames = [user.username for user in current_user.following]

    return {"following": following_usernames}

@router.get("/users/me/followers")
async def list_followers(db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    # Asynchronously load the 'followers' relationship
    await db.refresh(current_user, attribute_names=["followers"])

    # Extract usernames of the followers
    follower_usernames = [user.username for user in current_user.followers]

    return {"followers": follower_usernames}


@router.patch("/users/me/weight")
async def set_weight(weight: int, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    current_user.weight = weight
    db.add(current_user)
    await db.commit()
    return {"message": "Weight updated successfully"}


@router.patch("/users/me/height")
async def set_height(height: int, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    current_user.height = height
    db.add(current_user)
    await db.commit()
    return {"message": "Height updated successfully"}


@router.get("/users/me")
async def get_current_user_information(
    current_user: UserModel = Depends(get_current_active_user)):
    # Assuming you want to return most of the fields in UserModel, except sensitive ones like password
    user_data = {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "photo": current_user.photo,
        "height": current_user.height,
        "weight": current_user.weight,
        "following_count": current_user.following_count,
        "followers_count": current_user.followers_count,
        "is_superuser": current_user.is_superuser,
        
    }

    return user_data


@router.get("/users/{username}")
async def get_user_information(username: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UserModel).where(UserModel.username == username))
    user = result.scalars().first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "photo": user.photo,
        "height": user.height,
        "weight": user.weight,
        "following_count": user.following_count,
        "followers_count": user.followers_count,
        "is_superuser": user.is_superuser,
    }

    return user_data

from factories import WorkoutFactory

@router.post("/save_workout/")
async def save_workout(jsonPlan : str, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    
    workout_created = await WorkoutFactory.create_workout(db, jsonPlan, userId = current_user.id)
    
    if workout_created is None:
        raise HTTPException(status_code=400, detail="The workout has not been created")
    return workout_created


#Controller
@router.get("/get_workouts/")
async def get_workouts(
    db: AsyncSession = Depends(get_db), 
    current_user: UserModel = Depends(get_current_active_user),
    user_id: int = Query(None)  # User ID is optional
):
    

    if user_id is not None and await get_user_by_id(db, user_id) is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    target_user_id = user_id if user_id is not None else current_user.id

    if get_user_by_id(db, target_user_id) is None:
        raise HTTPException(status_code=404, detail="User not found")

    workout_plans = await get_all_user_workouts(db, target_user_id)
    
    if workout_plans is None:
        raise HTTPException(status_code=500, detail="An error occurred while retrieving training plans.")

    return workout_plans



@router.post("/save_plan")
async def save_training(jsonPlan : str, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    
    training_created = await PlanFactory.create_plan(db, jsonPlan, userId = current_user.id)
    
    if training_created is None:
        raise HTTPException(status_code=400, detail="The training has not been created")
    return training_created



@router.get("/get_plans/")
async def get_plans(
    db: AsyncSession = Depends(get_db), 
    current_user: UserModel = Depends(get_current_active_user),
    user_id: int = Query(None)  # User ID is optional
):
    

    if user_id is not None and await get_user_by_id(db, user_id) is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    target_user_id = user_id if user_id is not None else current_user.id

    if get_user_by_id(db, target_user_id) is None:
        raise HTTPException(status_code=404, detail="User not found")

    training_plans = await get_all_user_plans(db, target_user_id)
    
    if training_plans is None:
        raise HTTPException(status_code=500, detail="An error occurred while retrieving training plans.")

    return training_plans




@router.patch("/set_photo")
async def set_photo(
    photo: str,
    db: AsyncSession = Depends(get_db), 
    current_user: UserModel = Depends(get_current_active_user),
    user_id: int = Query(None),  # User ID is optional
):

    if user_id is not None: current_user = await get_user_by_id(db, user_id)

    if current_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    current_user.photo = photo

    db.add(current_user)
    await db.commit()

    return {"message": "Photo updated successfully"}


@router.get("/get_users")
async def get_users(
    db: AsyncSession = Depends(get_db), 
):

    users = await db.execute(select(UserModel))
    users = users.scalars().all()
    return {"users": users}



@router.get("/get_list_of_following")
async def get_list_of_following(
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user),
    user_id: int = Query(None)
):
    # Determine the target user's ID
    target_user_id = user_id if user_id is not None else current_user.id

    # Asynchronously fetch the user from the database
    user = await db.get(UserModel, target_user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Asynchronously fetch the list of users that the target user is following
    following_list = await db.execute(
        select(UserModel).where(UserModel.followers.any(id=target_user_id))
    )
    following_list = following_list.scalars().all()

    return following_list

@router.get("/get_list_of_followers")
async def get_list_of_followers(
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user),
    user_id: int = Query(None)
):
    # Determine the target user's ID
    target_user_id = user_id if user_id is not None else current_user.id

    # Asynchronously fetch the user from the database
    user = await db.get(UserModel, target_user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Asynchronously fetch the list of users that the target user is following
    followers_list = await db.execute(
        select(UserModel).where(UserModel.following.any(id=target_user_id))
    )
    followers_list = followers_list.scalars().all()

    return followers_list





@router.get("/get_followers_ids")
async def get_list_of_ids(
    db: AsyncSession = Depends(get_db),
    current_user: UserModel = Depends(get_current_active_user),
    user_id: int = Query(None)
):
    # Determine the target user's ID
    target_user_id = user_id if user_id is not None else current_user.id

    # Asynchronously fetch the user from the database
    user = await db.get(UserModel, target_user_id)

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Asynchronously fetch the list of users that the target user is following
    following_list = await db.execute(
        select(UserModel).where(UserModel.followers.any(id=target_user_id))
    )
    following_list = following_list.scalars().all()

    following_list = [user.id for user in following_list]

    return following_list