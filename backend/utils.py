import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from security import oauth2_scheme
from models import UserModel

from getpass import getpass


from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models import WorkoutModel, ExerciseModel, SerieModel

async def get_all_user_plans(db: AsyncSession, user_id: int):
    try:
        result = await db.execute(select(WorkoutModel).filter(WorkoutModel.creatorid == user_id))
        workouts = result.scalars().all()

        user_plans = []
        for workout in workouts:
            result = await db.execute(select(ExerciseModel).filter(ExerciseModel.workout_id == workout.id))
            exercises = result.scalars().all()

            workout_data = {
                "workout_id": workout.id,
                "workout_name": workout.name,
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
