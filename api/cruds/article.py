from sqlalchemy.orm import Session
from models.article import Article
import schemas.article as article_schema
from typing import List


async def get_articles(db: Session) -> List[article_schema.ArticleResponse]:
    articles = db.query(Article).all()
    print(articles)
    return [
        {
            "id": str(article.id),
            "title": article.title,
            "description": article.description,
            "author_id": str(article.author_id),
            # "author": article.author,
            "created_at": article.created_at,
            "updated_at": article.updated_at,
            "deleted_at": article.deleted_at,
            "path": article.path,
            "filename": article.filename,
            "allow_external": article.allow_external,
            "show_from": article.show_from,
            "show_until": article.show_until,
            "review_ok": article.review_ok,
            "tags": article.tags,
            "comments": article.comments,
            "likes": article.likes,
            "reviews": article.reviews,
        }
        for article in articles
    ]


async def create_article(db: Session, article_create: article_schema.ArticleCreate) -> article_schema.ArticleResponse:
    article = Article(**article_create.dict())
    db.add(article)
    db.commit()
    db.refresh(article)
    return {
        "id": str(article.id),
        "title": article.title,
        "description": article.description,
        "author_id": str(article.author_id),
        "created_at": article.created_at,
        "updated_at": article.updated_at,
        "deleted_at": article.deleted_at,
        "path": article.path,
        "filename": article.filename,
        "allow_external": article.allow_external,
        "show_from": article.show_from,
        "show_until": article.show_until,
        "review_ok": article.review_ok,
        "tags": article.tags,
        "comments": article.comments,
        "likes": article.likes,
        "reviews": article.reviews,
    }


async def get_article(db: Session, id: str) -> article_schema.ArticleResponse:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return {
            "id": str(article.id),
            "title": article.title,
            "description": article.description,
            "author_id": str(article.author_id),
            "created_at": article.created_at,
            "updated_at": article.updated_at,
            "deleted_at": article.deleted_at,
            "path": article.path,
            "filename": article.filename,
            "allow_external": article.allow_external,
            "show_from": article.show_from,
            "show_until": article.show_until,
            "review_ok": article.review_ok,
            "tags": article.tags,
            "comments": article.comments,
            "likes": article.likes,
            "reviews": article.reviews,
        }
    else:
        return {"error": "article not found"}


async def update_article(db: Session, article_update: article_schema.ArticleUpdate) -> article_schema.ArticleResponse:
    article = db.query(Article).filter(Article.id == article_update.id).first()
    if article:
        article.title = article_update.title
        article.description = article_update.description
        article.path = article_update.path
        article.filename = article_update.filename
        article.allow_external = article_update.allow_external
        article.show_from = article_update.show_from
        article.show_until = article_update.show_until
        article.review_ok = article_update.review_ok
        db.commit()
        db.refresh(article)
        return {
            "id": str(article.id),
            "title": article.title,
            "description": article.description,
            "author_id": str(article.author_id),
            "created_at": article.created_at,
            "updated_at": article.updated_at,
            "deleted_at": article.deleted_at,
            "path": article.path,
            "filename": article.filename,
            "allow_external": article.allow_external,
            "show_from": article.show_from,
            "show_until": article.show_until,
            "review_ok": article.review_ok,
            "tags": article.tags,
            "comments": article.comments,
            "likes": article.likes,
            "reviews": article.reviews,
        }
    else:
        return {"error": "article not found"}


async def delete_article(db: Session, id: str) -> article_schema.ArticleResponse:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        article.deleted_at = datetime.datetime.now()
        db.commit()
        db.refresh(article)
        return {
            "id": str(article.id),
            "title": article.title,
            "description": article.description,
            "author_id": str(article.author_id),
            "created_at": article.created_at,
            "updated_at": article.updated_at,
            "deleted_at": article.deleted_at,
            "path": article.path,
            "filename": article.filename,
            "allow_external": article.allow_external,
            "show_from": article.show_from,
            "show_until": article.show_until,
            "review_ok": article.review_ok,
            "tags": article.tags,
            "comments": article.comments,
            "likes": article.likes,
            "reviews": article.reviews,
        }
    else:
        return {"error": "article not found"}


async def restore_article(db: Session, id: str) -> article_schema.ArticleResponse:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        article.deleted_at = None
        db.commit()
        db.refresh(article)
        return {
            "id": str(article.id),
            "title": article.title,
            "description": article.description,
            "author_id": str(article.author_id),
            "created_at": article.created_at,
            "updated_at": article.updated_at,
            "deleted_at": article.deleted_at,
            "path": article.path,
            "filename": article.filename,
            "allow_external": article.allow_external,
            "show_from": article.show_from,
            "show_until": article.show_until,
            "review_ok": article.review_ok,
            "tags": article.tags,
            "comments": article.comments,
            "likes": article.likes,
            "reviews": article.reviews,
        }
    else:
        return {"error": "article not found"}


async def get_article_comments(db: Session, id: str) -> list[article_schema.ArticleCommentResponse]:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return [
            {
                "id": str(comment.id),
                "description": comment.description,
                "created_at": comment.created_at,
                "updated_at": comment.updated_at,
                "deleted_at": comment.deleted_at,
                "article_id": comment.article_id,
                "author_id": comment.author_id,
            }
            for comment in article.comments
        ]
    else:
        return {"error": "article not found"}


async def get_article_likes(db: Session, id: str) -> list[article_schema.ArticleLikeResponse]:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return [
            {
                "id": str(like.id),
                "article_id": like.article_id,
                "user_id": like.user_id,
            }
            for like in article.likes
        ]
    else:
        return {"error": "article not found"}


async def get_article_reviews(db: Session, id: str) -> list[article_schema.ArticleReviewResponse]:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
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
            for review in article.reviews
        ]
    else:
        return {"error": "article not found"}


async def get_article_tags(db: Session, id: str) -> list[article_schema.ArticleTagResponse]:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return [
            {
                "id": str(tag.id),
                "name": tag.name,
            }
            for tag in article.tags
        ]
    else:
        return {"error": "article not found"}


async def get_article_author(db: Session, id: str) -> article_schema.ArticleAuthorResponse:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return {
            "id": str(article.author.id),
            "name": article.author.name,
            "email": article.author.email,
            "password": article.author.password,
            "role": article.author.role,
            "created_at": article.author.created_at,
            "updated_at": article.author.updated_at,
            "deleted_at": article.author.deleted_at,
        }
    else:
        return {"error": "article not found"}


async def get_article_advent_calendar(db: Session, id: str) -> article_schema.ArticleAdventCalendarResponse:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return {
            "id": str(article.advent_calendar.id),
            "year": article.advent_calendar.year,
            "created_at": article.advent_calendar.created_at,
            "updated_at": article.advent_calendar.updated_at,
            "deleted_at": article.advent_calendar.deleted_at,
        }
    else:
        return {"error": "article not found"}


async def get_article_advent_calendar_articles(
    db: Session, id: str
) -> list[article_schema.ArticleAdventCalendarArticleResponse]:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
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
            for article in article.advent_calendar.articles
        ]
    else:
        return {"error": "article not found"}


async def get_article_advent_calendar_author(
    db: Session, id: str
) -> article_schema.ArticleAdventCalendarAuthorResponse:
    article = db.query(Article).filter(Article.id == id).first()
    if article:
        return {
            "id": str(article.advent_calendar.author.id),
            "name": article.advent_calendar.author.name,
            "email": article.advent_calendar.author.email,
            "password": article.advent_calendar.author.password,
            "role": article.advent_calendar.author.role,
            "created_at": article.advent_calendar.author.created_at,
            "updated_at": article.advent_calendar.author.updated_at,
            "deleted_at": article.advent_calendar.author.deleted_at,
        }
    else:
        return {"error": "article not found"}
