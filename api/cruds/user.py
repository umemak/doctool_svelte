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

async def get_user_by_email(db: Session, email: str) -> user_schema.UserResponse:
    user = db.query(User).filter(User.email == email).first()
    if user:
        return {"id": str(user.id), "email": user.email, "name": user.name}
    else:
        return {"error": "user not found"}

async def create_user(db: Session, user_create: user_schema.UserCreate) -> user_schema.UserResponse:
    user = User(**user_create.dict())
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"id": str(user.id), "email": user.email, "name": user.name}

async def update_user(db: Session, user_update: user_schema.UserUpdate) -> user_schema.UserResponse:
    user = db.query(User).filter(User.id == user_update.id).first()
    if user:
        user.name = user_update.name
        db.commit()
        db.refresh(user)
        return {"id": str(user.id), "email": user.email, "name": user.name}
    else:
        return {"error": "user not found"}

async def delete_user(db: Session, id: str) -> user_schema.UserResponse:
    user = db.query(User).filter(User.id == id).first()
    if user:
        user.deleted_at = datetime.datetime.now()
        db.commit()
        db.refresh(user)
        return {"id": str(user.id), "email": user.email, "name": user.name}
    else:
        return {"error": "user not found"}

async def restore_user(db: Session, id: str) -> user_schema.UserResponse:
    user = db.query(User).filter(User.id == id).first()
    if user:
        user.deleted_at = None
        db.commit()
        db.refresh(user)
        return {"id": str(user.id), "email": user.email, "name": user.name}
    else:
        return {"error": "user not found"}

async def get_user_reviews(db: Session, id: str) -> list[user_schema.UserReviewResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(review.id),
                "article_id": review.article_id,
                "comment": review.comment,
                "created_at": review.created_at,
                "updated_at": review.updated_at,
                "deleted_at": review.deleted_at,
                "reviewer_id": review.reviewer_id,
                "approved": review.approved,
            }
            for review in user.reviews
        ]
    else:
        return {"error": "user not found"}

async def get_user_articles(db: Session, id: str) -> list[user_schema.UserArticleResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(article.id),
                "title": article.title,
                "description": article.description,
                "created_at": article.created_at,
                "updated_at": article.updated_at,
                "deleted_at": article.deleted_at,
                "author_id": article.author_id,
            }
            for article in user.articles
        ]
    else:
        return {"error": "user not found"}

async def get_user_comments(db: Session, id: str) -> list[user_schema.UserCommentResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(comment.id),
                "content": comment.content,
                "created_at": comment.created_at,
                "updated_at": comment.updated_at,
                "deleted_at": comment.deleted_at,
                "author_id": comment.author_id,
                "article_id": comment.article_id,
            }
            for comment in user.comments
        ]
    else:
        return {"error": "user not found"}

async def get_user_likes(db: Session, id: str) -> list[user_schema.UserLikeResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(like.id),
                "created_at": like.created_at,
                "updated_at": like.updated_at,
                "deleted_at": like.deleted_at,
                "author_id": like.author_id,
                "article_id": like.article_id,
            }
            for like in user.likes
        ]
    else:
        return {"error": "user not found"}

async def get_user_advent_calendars(db: Session, id: str) -> list[user_schema.UserAdventCalendarResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(ac.id),
                "year": ac.year,
                "created_at": ac.created_at,
                "updated_at": ac.updated_at,
                "deleted_at": ac.deleted_at,
            }
            for ac in user.advent_calendars
        ]
    else:
        return {"error": "user not found"}

async def get_user_advent_calendar_articles(db: Session, id: str) -> list[user_schema.UserAdventCalendarArticleResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(aca.id),
                "day": aca.day,
                "created_at": aca.created_at,
                "updated_at": aca.updated_at,
                "deleted_at": aca.deleted_at,
            }
            for aca in user.advent_calendar_articles
        ]
    else:
        return {"error": "user not found"}

async def get_user_advent_calendar_article_likes(db: Session, id: str) -> list[user_schema.UserAdventCalendarArticleLikeResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(acal.id),
                "created_at": acal.created_at,
                "updated_at": acal.updated_at,
                "deleted_at": acal.deleted_at,
            }
            for acal in user.advent_calendar_article_likes
        ]
    else:
        return {"error": "user not found"}

async def get_user_advent_calendar_article_comments(db: Session, id: str) -> list[user_schema.UserAdventCalendarArticleCommentResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(acac.id),
                "description": acac.description,
                "created_at": acac.created_at,
                "updated_at": acac.updated_at,
                "deleted_at": acac.deleted_at,
            }
            for acac in user.advent_calendar_article_comments
        ]
    else:
        return {"error": "user not found"}

async def get_user_advent_calendar_article_comment_likes(db: Session, id: str) -> list[user_schema.UserAdventCalendarArticleCommentLikeResponse]:
    user = db.query(User).filter(User.id == id).first()
    if user:
        return [
            {
                "id": str(acacl.id),
                "created_at": acacl.created_at,
                "updated_at": acacl.updated_at,
                "deleted_at": acacl.deleted_at,
            }
            for acacl in user.advent_calendar_article_comment_likes
        ]
    else:
        return {"error": "user not found"}
