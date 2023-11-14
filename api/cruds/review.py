import schemas.review as review_schema
import models.review as review_model
from sqlalchemy.orm import Session


async def get_reviews(db: Session) -> list[review_schema.ReviewResponse]:
    return db.query(review_model).filter(review_model.deleted_at != None).all()


async def get_review(db: Session, id: str) -> review_schema.ReviewResponse:
    review = db.query(review_model).filter(review_model.id == id).first()
    if review:
        return {
            "id": str(review.id),
            "article_id": review.article_id,
            "comment": review.comment,
            "created_at": review.created_at,
            "updated_at": review.updated_at,
            "deleted_at": review.deleted_at,
            "reviewer_id": review.reviewer_id,
            "approved": review.approved,
        }
    else:
        return {"error": "review not found"}


async def create_review(db: Session, review_create: review_schema.ReviewCreate) -> review_schema.ReviewResponse:
    review = review_model(**review_create.dict())
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


async def update_review(db: Session, review_update: review_schema.ReviewUpdate) -> review_schema.ReviewResponse:
    review = db.query(review_model).filter(review_model.id == review_update.id).first()
    if review:
        review.comment = review_update.comment
        review.approved = review_update.approved
        db.commit()
        db.refresh(review)
        return review
    else:
        return {"error": "review not found"}
