from sqlalchemy.orm import Session
from models.user import User
import schemas.user as user_schema


async def get_users(db: Session) -> list[user_schema.UserResponse]:
    return db.query(User).filter(User.deleted_at != None).all()


async def get_user(db: Session, id: str) -> user_schema.UserResponse:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return {"id": str(user.id), "email": user.email, "name": user.name}
    else:
        return {"error": "user not found"}
