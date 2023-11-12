from sqlalchemy.orm import Session
from models.article import Article
import schemas.article as article_schema
from typing import List


async def get_articles(db: Session) -> List[article_schema.ArticleResponse]:
    articles= db.query(Article).all()
    return [
        {
            "id": str(article.id),
            "title": article.title,
            "content": article.content,
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
        "content": article.content,
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
