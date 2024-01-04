import enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Table, Enum, Float

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import Boolean


Base = declarative_base()

follow_association = Table('follow_association', Base.metadata,
    Column('follower_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('followed_id', Integer, ForeignKey('users.id'), primary_key=True)
)



#Model
class UserModel(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    photo = Column(String, nullable=True)
    is_superuser = Column(Boolean, default=False)
    height = Column(Integer, nullable=True)
    weight = Column(Integer, nullable=True)
    following_count = Column(Integer, default=0)
    followers_count = Column(Integer, default=0)
    #user_type = Column(String, default="user")

    #Relationship for following/followers
    following = relationship(
        "UserModel", 
        secondary=follow_association,
        primaryjoin=id == follow_association.c.follower_id,
        secondaryjoin=id == follow_association.c.followed_id,
        backref="followers"
    )

  #  trainings = relationship("Training", back_populates="user")





class WorkoutModel(Base):
    __tablename__ = 'workouts'
    id = Column(Integer, primary_key=True, autoincrement=True)
    creatorid = Column(Integer, ForeignKey('users.id'))
    name = Column(String(50))

    exercises = relationship(
        "ExerciseModel",
        backref="workout",
        cascade="all, delete, delete-orphan"
    )

class ExerciseModel(Base):
    __tablename__ = 'exercises'
    id = Column(Integer, primary_key=True, autoincrement=True)
    workout_id = Column(Integer, ForeignKey('workouts.id'))
    name = Column(String(50))

    series = relationship(
        "SerieModel",
        backref="exercise",
        cascade="all, delete, delete-orphan"
    )

class SerieModel(Base):
    __tablename__ = 'series'
    id = Column(Integer, primary_key=True, autoincrement=True)
    exercise_id = Column(Integer, ForeignKey('exercises.id'))
    counter = Column(Integer)
    weight = Column(Float)
    reps = Column(Integer)

## chuj wie co z tym
class BodyPart(enum.Enum):
    whole_body = "whole_body"
    legs = "legs"
    back = "back"
    chest = "chest"
    shoulders = "shoulders"
    biceps = "biceps"
    triceps = "triceps"
    core = "core"
    forearms = "forearms"





''''
training_exercise = Table('training_exercise', Base.metadata,
    Column('training_id', Integer, ForeignKey('trainings.id')),
    Column('exercise_id', Integer, ForeignKey('exercises.id'))
)


class SeriesModel(Base):
    __tablename__ = 'series'
    id = Column(Integer, primary_key=True)
    repetitions = Column(Integer)  # Number of repetitions in this series
    weight = Column(Float)         # Weight used in this series (if applicable)
    exercise_id = Column(Integer, ForeignKey('exercises.id'))  # Foreign key to the ExerciseModel

    exercise = relationship("ExerciseModel", back_populates="series")


class ExerciseModel(Base):
    __tablename__ = 'exercises'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    body_part = Column(Enum(BodyPart))
    image = Column(String, nullable=True)
   
    #user_id = Column(Integer, ForeignKey('users.id'))
    #user = relationship("UserModel", back_populates="exercises")

    trainings = relationship("Training", secondary=training_exercise, back_populates="exercises")
    series = relationship("SeriesModel", back_populates="exercise")


class Training(Base):
    __tablename__ = 'trainings'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    exercises = relationship("ExerciseModel", secondary=training_exercise, back_populates="trainings")    
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("UserModel", back_populates="trainings")

'''