import jwt
from fastapi import Depends, HTTPException, Request
from functools import wraps
from fastapi.security import OAuth2PasswordBearer
from security import oauth2_scheme
from models import UserModel

from getpass import getpass


from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import WorkoutModel, ExerciseModel, SerieModel, TrainingModel, ExerciseModel2



#View
async def get_all_user_workouts(db: AsyncSession, user_id: int):
    try:
        result = await db.execute(select(WorkoutModel).filter(WorkoutModel.creatorid == user_id))
        workouts = result.scalars().all()

        user_plans = []
        for workout in workouts:
            result = await db.execute(select(ExerciseModel).filter(ExerciseModel.workout_id == workout.id))
            exercises = result.scalars().all()

            workout_data = {
                "workout_id": workout.id,
                "workout_tile": workout.title,
                "exercises": []
            }

            for exercise in exercises:
                result = await db.execute(select(SerieModel).filter(SerieModel.exercise_id == exercise.id))
                series = result.scalars().all()

                exercise_data = {
                    "exercise_id": exercise.id,
                    "exercise_name": exercise.name,
                    "series": [{
                        "series_id": serie.id,
                        "counter": serie.counter,
                        "weight": serie.weight,
                        "reps": serie.reps
                    } for serie in series]
                }

                workout_data["exercises"].append(exercise_data)

            user_plans.append(workout_data)

        return user_plans

    except Exception as e:
        # Handle or log the error as needed
        print(f"Error occurred: {e}")
        return None




#Decorators
def log_login_attempt(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        request: Request = kwargs.get('form_data', None)  # Assuming 'form_data' is passed to your endpoint
        try:
            response = await func(*args, **kwargs)
            if request:
                # Log successful login
                print(f"Successful login for user: {request.username}")
            return response
        except HTTPException as http_exc:
            if request:
                # Log unsuccessful login attempt
                print(f"Unsuccessful login attempt for user: {request.username}")
            raise http_exc
    return wrapper




async def get_all_user_plans(db: AsyncSession, user_id: int):
    try:
        result = await db.execute(select(TrainingModel).filter(TrainingModel.creatorid == user_id))
        trainings = result.scalars().all()

        user_plans = []
        for training in trainings:
            result = await db.execute(select(ExerciseModel2).filter(ExerciseModel2.training_id == training.id))
            exercises = result.scalars().all()

            training_data = {
                "plan_id": training.id,
                "plan_title": training.title,
                "exercises": []
            }

            for exercise in exercises:
                exercise_data = {
                    "exercise_id": exercise.exercise_id,
                    "num_series": exercise.num_series
                }

                training_data["exercises"].append(exercise_data)

            user_plans.append(training_data)

        return user_plans

    except Exception as e:
        # Handle or log the error as needed
        print(f"Error occurred: {e}")
        return None