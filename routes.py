from fastapi import APIRouter, FastAPI, HTTPException, Depends
from models import UserModel, Base
from schemas import User, UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_db
from factories import UserFactory
from security import authenticate_user, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from typing import Any
from typing import Optional, Annotated
from schemas import Token
from fastapi import Security
from database import engine, test_connection
from dotenv import load_dotenv
import os
from security import get_current_active_user
from sqlalchemy import select
from security import get_password_hash
from database import async_session
from models import ExerciseModel, Training, SeriesModel
from schemas import TrainingCreate, TrainingExerciseAdd, ExerciseCreate, ExerciseSeriesAdd


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
async def get_current_user_information(current_user: UserModel = Depends(get_current_active_user)):
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


@router.post("/add_exercise/")
async def add_exercise(exercise: ExerciseCreate, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    
    if current_user.is_superuser == False:
        raise HTTPException(status_code=400, detail="Only superusers can add exercises")


    new_exercise = ExerciseModel(name=exercise.name, body_part=exercise.body_part)
    
    # Add the new exercise to the database
    db.add(new_exercise)
    await db.commit()
    
    return {"message": "Exercise added successfully"}


@router.get("/get_exercises/")
async def get_exercises(db: AsyncSession = Depends(get_db)):
    exercises = await db.execute(select(ExerciseModel))
    exercises = exercises.scalars().all()
    return {"exercises": exercises}


@router.post("/trainings/")
async def create_training(training_data: TrainingCreate, db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    new_training = Training(name=training_data.name, user_id=current_user.id)
    db.add(new_training)
    await db.commit()
    await db.refresh(new_training)
    return new_training


@router.post("/trainings/{training_name}/add_exercise/")
async def add_exercise_to_training(training_name: str, exercise_data: TrainingExerciseAdd, db: AsyncSession = Depends(get_db)):
    training = await db.get(Training, training_name)
    if not training:
        raise HTTPException(status_code=404, detail="Training not found")

    # Assuming exercise_data contains exercise IDs to be added
    for exercise_id in exercise_data.exercise_ids:
        # Retrieve and add each exercise to the training
        # Implement logic to fetch and associate exercises with the training
        pass

    await db.commit()
    return {"message": "Exercises added to training"}


@router.post("/exercises/{exercise_id}/add_series/")
async def add_series_to_exercise(exercise_id: int, series_data: ExerciseSeriesAdd, db: AsyncSession = Depends(get_db)):
    exercise = await db.get(ExerciseModel, exercise_id)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    # Assuming series_data contains details for each series to be added
    for series in series_data.series:
        new_series = SeriesModel(repetitions=series.repetitions, weight=series.weight, exercise_id=exercise.id)
        db.add(new_series)

    await db.commit()
    return {"message": "Series added to exercise"}



@router.get("/my_trainings/")
async def list_my_trainings(db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    trainings = await db.execute(select(Training).where(Training.user_id == current_user.id))
    trainings = trainings.scalars().all()
    return {"trainings": trainings}

"""
from fastapi import UploadFile, File
@router.patch("/users/me/photo")
async def set_photo(photo: UploadFile = File(...), db: AsyncSession = Depends(get_db), current_user: UserModel = Depends(get_current_active_user)):
    # Here, handle the file (e.g., save it to a server or cloud storage)
    # For this example, let's assume you save the URL/path to the photo in the user's profile
    current_user.photo = "/path/to/saved/photo.jpg"
    db.add(current_user)
    await db.commit()
    return {"message": "Photo updated successfully"}
"""