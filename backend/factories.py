
from models import UserModel, WorkoutModel, ExerciseModel, SerieModel, ExerciseModel2, TrainingModel
from schemas import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from security import pwd_context
import json
from datetime import datetime


class UserFactory:
    @staticmethod
    async def create_user(db: AsyncSession, user_data: UserCreate) -> bool:

        hashed_password = pwd_context.hash(user_data.password)

        new_user = UserModel(
            username=user_data.username,
            email=user_data.email,  # Assuming you have an email field
            full_name=user_data.full_name,  # Assuming you have a full_name field
            photo=user_data.photo,  # Assuming you have a photo field
            height=user_data.height,  # Assuming you have a height field
            weight=user_data.weight,  # Assuming you have a weight field
            hashed_password=hashed_password
        )

        try:
            
            db.add(new_user)
            await db.commit()
            await db.refresh(new_user)  
            return new_user
        except SQLAlchemyError as e:
            await db.rollback() 
            return None



class WorkoutFactory:
    @staticmethod
    async def create_workout(db: AsyncSession, jsonPlan: str, userId: int) -> bool:
        try:
            dictPlan = json.loads(jsonPlan)

            # Convert the ISO format string to datetime object
            start_training = datetime.fromisoformat(dictPlan["start_training"].replace("Z", ""))
            end_training = datetime.fromisoformat(dictPlan["end_training"].replace("Z", ""))


            # Create and add new workout
            new_workout = WorkoutModel(creatorid=userId, title=dictPlan["title"], start_training=start_training, end_training=end_training)
            db.add(new_workout)
            await db.flush()  # Flush to get the id assigned

            # Iterate over exercises in the JSON plan
            for exercise in dictPlan["exercises"]:
                new_exercise = ExerciseModel(workout_id=new_workout.id, exercise_id=exercise["exercise_id"])
                db.add(new_exercise)
                await db.flush()  # Flush to get the id assigned to new_exercise

                # Iterate over series in the exercise
                for serie in exercise["series"]:
                    new_serie = SerieModel(
                        exercise_id=new_exercise.id,
                        counter=serie["counter"],
                        weight=serie["weight"],
                        reps=serie["reps"]
                    )
                    db.add(new_serie)

            # Commit all new records to the database
            await db.commit()
            return True

        except SQLAlchemyError as e:
            await db.rollback()
            print(f"Error occurred: {e}")
            return False




class PlanFactory:
    @staticmethod
    async def create_plan(db: AsyncSession, jsonPlan: str, userId: int) -> bool:
        try:
            dictPlan = json.loads(jsonPlan)

            # Create and add new training plan
            new_training = TrainingModel(creatorid=userId, title=dictPlan["title"])
            db.add(new_training)
            await db.flush()  # Flush to get the id assigned

            # Iterate over exercises in the JSON plan
            for exercise in dictPlan["exercises"]:
                # Here, directly use num_series from the JSON
                new_exercise = ExerciseModel2(training_id=new_training.id, 
                                              exercise_id=exercise["exercise_id"], 
                                              num_series=exercise["num_series"])
                db.add(new_exercise)

            # Commit all new records to the database
            await db.commit()
            return True

        except SQLAlchemyError as e:
            await db.rollback()
            print(f"Error occurred: {e}")
            return False







