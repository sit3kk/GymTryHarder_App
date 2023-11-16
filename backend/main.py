from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from datetime import datetime, timedelta
from typing import Optional, Annotated
from fastapi import Depends
from fastapi import status
from jose.exceptions import JWTError
from pydantic import ValidationError
from fastapi import FastAPI, HTTPException, Security
import asyncpg
import os
import jwt
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import Path
from fastapi import Response
from typing import List
from functools import wraps

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")    
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


async def get_db():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
    scopes: list[str] = []

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None
    is_admin: bool = False 

class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    full_name: Optional[str] = None

class UserInDb(User):
    hashed_password: str
    workout_plan_id: Optional[int] = None

class WorkoutExercise(BaseModel):
    name: str
    sets: int
    reps: int
    rest: int

class WorkoutPLan(BaseModel):
    title: str
    exercises: list[WorkoutExercise]

class DatabaseConnection:
    _instance = None

    def __new__(cls, database_url=DATABASE_URL):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance.database_url = database_url
        return cls._instance

    async def get_db(self):
        conn = await asyncpg.connect(self.database_url)
        try:
            yield conn
        finally:
            await conn.close()

class UserFactory:
    @staticmethod
    async def create_user(db, user_data: UserCreate):
        hashed_password = pwd_context.hash(user_data.password)
        try:
            await db.execute(
                "INSERT INTO users (username, email, full_name, hashed_password) VALUES ($1, $2, $3, $4)",
                user_data.username, user_data.email, user_data.full_name, hashed_password
            )
            return True
        except Exception as e:
            print(e)
            return False


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token",
    scopes = {"me" : "Read information about the current user.", "items" : "Read items."}
    )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.mount("/frontend", StaticFiles(directory="frontend", html=True), name="static")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def log_function_call(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with args {args} and kwargs {kwargs}")
        result = await func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

async def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(db, username: str):
    user_record = await db.fetchrow("SELECT * FROM users WHERE username = $1", username)
    if user_record:
        return UserInDb(**user_record)
    return None

async def authenticate_user(db, username: str, password: str):
    user = await get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

async def create_access_token(data : dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp" : expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    security_scopes: SecurityScopes, 
    token: str = Depends(oauth2_scheme), 
    db: asyncpg.pool.Pool = Depends(DatabaseConnection().get_db)
):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        token_data = TokenData(scopes=token_scopes, username=username)
    except (JWTError, ValidationError):
        raise credentials_exception
    
    user = await get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    
    return user

async def get_current_active_user(token: str = Depends(oauth2_scheme), db: asyncpg.pool.Pool = Depends(get_db)):
    user = await get_current_user(SecurityScopes(), token, db)
    if user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user
        
async def create_user(db, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    try:
        await db.execute(
            "INSERT INTO users (username, email, full_name, hashed_password) VALUES ($1, $2, $3, $4)",
            user.username, user.email, user.full_name, hashed_password
        )
        return True
    except Exception as e:
        print(e)
        return False

async def add_plan_to_db(db, username: str, workout_plan: WorkoutPLan):
    try:
        # Start a transaction
        transaction = db.transaction()
        await transaction.start()

        # Fetch the user_id from the users table
        user_id = await db.fetchval("SELECT id FROM users WHERE username = $1", username)
        if not user_id:
            await transaction.rollback()
            raise Exception(f"User {username} not found")

        # Insert the new workout plan and get its ID
        plan_id = await db.fetchval(
            "INSERT INTO workout_plans (title, user_id) VALUES ($1, $2) RETURNING id",
            workout_plan.title, user_id
        )

        # Insert each exercise associated with the workout plan
        for exercise in workout_plan.exercises:
            await db.execute(
                "INSERT INTO workout_exercises (plan_id, name, sets, reps, rest) VALUES ($1, $2, $3, $4, $5)",
                plan_id, exercise.name, exercise.sets, exercise.reps, exercise.rest
            )

        # Commit the transaction
        await transaction.commit()
        return plan_id
    except Exception as e:
        # Rollback the transaction in case of error
        await transaction.rollback()
        print(e)
        return False

async def delete_plan_from_db(db, plan_id: int, username: str):
    try:
        result = await db.execute(
            "DELETE FROM workout_plans WHERE id = $1 AND user = $2",
            plan_id, username
        )
        return result == 'DELETE 1'  # This depends on your DB driver's behavior
    except Exception as e:
        print(e)
        return False

async def check_existing_plan(db, username: str, title: str):
    try:
        user_id = await db.fetchval("SELECT id FROM users WHERE username = $1", username)
        plan = await db.fetchrow(
            "SELECT * FROM workout_plans WHERE user_id = $1 AND title = $2",
            user_id, title
        )
        return plan is not None
    except Exception as e:
        print(e)
        return False

async def delete_plan_by_name(db, plan_name: str, username: str):
    try:
        user_id = await db.fetchval("SELECT id FROM users WHERE username = $1", username)
        if not user_id:
            return False

        # Retrieve the ID of the workout plan
        plan_id = await db.fetchval("SELECT id FROM workout_plans WHERE title = $1 AND user_id = $2", plan_name, user_id)
        if not plan_id:
            return False

        # First delete all exercises linked to the workout plan
        await db.execute("DELETE FROM workout_exercises WHERE plan_id = $1", plan_id)

        # Then delete the workout plan itself
        result = await db.execute("DELETE FROM workout_plans WHERE id = $1", plan_id)
        return result == 'DELETE 1'
    except Exception as e:
        print(e)
        return False

async def fetch_all_plans(db):
    try:
        plans = await db.fetch("SELECT * FROM workout_plans")
        all_plans = []
        for plan in plans:
            exercises = await db.fetch(
                "SELECT name, sets, reps, rest FROM workout_exercises WHERE plan_id = $1",
                plan['id']
            )
            plan_exercises = [WorkoutExercise(**exercise) for exercise in exercises]
            workout_plan = WorkoutPLan(title=plan['title'], exercises=plan_exercises)
            all_plans.append(workout_plan)
        return all_plans
    except Exception as e:
        print(e)
        return []

async def fetch_user_plans(db, username: str):
    try:
        user_id = await db.fetchval("SELECT id FROM users WHERE username = $1", username)
        plans = await db.fetch("SELECT * FROM workout_plans WHERE user_id = $1", user_id)
        all_plans = []
        for plan in plans:
            exercises = await db.fetch(
                "SELECT name, sets, reps, rest FROM workout_exercises WHERE plan_id = $1",
                plan['id']
            )
            plan_exercises = [WorkoutExercise(**exercise) for exercise in exercises]
            workout_plan = WorkoutPLan(title=plan['title'], exercises=plan_exercises)
            all_plans.append(workout_plan)
        return all_plans
    except Exception as e:
        print(e)
        return []

@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: asyncpg.pool.Pool = Depends(get_db)
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

@app.post("/register", response_model=User)
async def register_user(user: UserCreate, db: asyncpg.pool.Pool = Depends(get_db)):
    user_created = await UserFactory.create_user(db, user)
    if not user_created:
        raise HTTPException(status_code=400, detail="Username already exists")
    
    new_user = await get_user(db, user.username)    
    return new_user.dict(exclude={"hashed_password"})

@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user

@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Security(get_current_active_user, scopes=["items"])]
):
    return [{"item_id": "Foo", "owner": current_user.username}]

@app.get("/status/")
@log_function_call
async def read_system_status(current_user: Annotated[User, Depends(get_current_user)]):
    return {"status": "ok"}

@app.get("/users/{username}/workout-plans", response_model=List[WorkoutPLan])
async def get_user_workout_plans(
    username: str = Path(..., title="The username of the user"),
    current_user: User = Depends(get_current_active_user),
    db: asyncpg.pool.Pool = Depends(get_db)
):
    if username != current_user.username:
        raise HTTPException(status_code=403, detail="Access denied")

    return await fetch_user_plans(db, username)


@app.delete("/users/{username}/workout-plans/{plan_name}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_workout_plan(
    plan_name: str,
    username: str = Path(..., title="The username of the user"),
    current_user: User = Depends(get_current_active_user),
    db: asyncpg.pool.Pool = Depends(get_db)
):
    if username != current_user.username:
        raise HTTPException(status_code=403, detail="You can only delete your own workout plans")

    deleted = await delete_plan_by_name(db, plan_name, username)
    if not deleted:
        raise HTTPException(status_code=404, detail="Workout plan not found")
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@app.get("/workout-plans", response_model=List[WorkoutPLan])
async def get_all_workout_plans(db: asyncpg.pool.Pool = Depends(get_db)):
    plans = await fetch_all_plans(db)
    return plans


@app.post("/users/{username}/make-admin")
async def make_user_admin(
    username: str,
    current_user: User = Depends(get_current_active_user),
    db: asyncpg.pool.Pool = Depends(get_db)
):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="You must be an admin to perform this action")

    user = await get_user(db, username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    await db.execute(
        "UPDATE users SET is_admin = TRUE WHERE username = $1",
        username
    )
    return {"status": "User has been made an admin"}


