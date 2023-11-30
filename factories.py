
from models import UserModel
from schemas import UserCreate
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError
from security import pwd_context

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

