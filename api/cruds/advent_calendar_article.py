from sqlalchemy.orm import Session
from models.advent_calendar_article import AdventCalendarArticle
import schemas.advent_calendar_article as advent_calendar_article_schema


async def get_advent_calendar_articles(
    db: Session,
) -> list[advent_calendar_article_schema.AdventCalendarArticleResponse]:
    acs = db.query(AdventCalendarArticle).all()
    return [
        {
            "id": str(ac.id),
            "advent_calendar_id": ac.advent_calendar_id,
            "day": ac.day,
            "title": ac.title,
            "author_id": ac.author_id,
            "article_id": ac.article_id,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
        }
    ]


async def get_advent_calendar_articles_by_ac(
    db: Session, id: str
) -> list[advent_calendar_article_schema.AdventCalendarArticleResponse]:
    acs = db.query(AdventCalendarArticle).filter(AdventCalendarArticle.advent_calendar_id == id).all()
    return [
        {
            "id": str(ac.id),
            "advent_calendar_id": ac.advent_calendar_id,
            "day": ac.day,
            "title": ac.title,
            "author_id": ac.author_id,
            "article_id": ac.article_id,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
        }
        for ac in acs
    ]


async def get_advent_calendar_articles_by_ac_and_day(
    db: Session, id: str, day: int
) -> list[advent_calendar_article_schema.AdventCalendarArticleResponse]:
    acs = (
        db.query(AdventCalendarArticle)
        .filter(AdventCalendarArticle.advent_calendar_id == id, AdventCalendarArticle.day == day)
        .all()
    )
    return [
        {
            "id": str(ac.id),
            "advent_calendar_id": ac.advent_calendar_id,
            "day": ac.day,
            "title": ac.title,
            "author_id": ac.author_id,
            "article_id": ac.article_id,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
        }
        for ac in acs
    ]


async def get_advent_calendar_article(
    db: Session, id: str
) -> advent_calendar_article_schema.AdventCalendarArticleResponse:
    ac = db.query(AdventCalendarArticle).filter(AdventCalendarArticle.id == id).first()
    if ac:
        return {
            "id": str(ac.id),
            "advent_calendar_id": ac.advent_calendar_id,
            "day": ac.day,
            "title": ac.title,
            "author_id": ac.author_id,
            "article_id": ac.article_id,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
        }
    else:
        return {"error": "advent_calendar_article not found"}


async def create_advent_calendar_article(
    db: Session, ac: advent_calendar_article_schema.AdventCalendarArticleCreate
) -> advent_calendar_article_schema.AdventCalendarArticleResponse:
    ac = AdventCalendarArticle(**ac.dict())
    db.add(ac)
    db.commit()
    db.refresh(ac)
    return ac


async def update_advent_calendar_article(
    db: Session, ac: advent_calendar_article_schema.AdventCalendarArticleUpdate
) -> advent_calendar_article_schema.AdventCalendarArticleResponse:
    ac = db.query(AdventCalendarArticle).filter(AdventCalendarArticle.id == ac.id).first()
    if ac:
        ac.advent_calendar_id = ac.advent_calendar_id
        ac.day = ac.day
        ac.title = ac.title
        ac.author_id = ac.author_id
        ac.article_id = ac.article_id
        db.commit()
        db.refresh(ac)
        return ac
    else:
        return {"error": "advent_calendar_article not found"}


async def delete_advent_calendar_article(
    db: Session, id: str
) -> advent_calendar_article_schema.AdventCalendarArticleResponse:
    ac = db.query(AdventCalendarArticle).filter(AdventCalendarArticle.id == id).first()
    if ac:
        ac.deleted_at = datetime.datetime.now()
        db.commit()
        db.refresh(ac)
        return ac
    else:
        return {"error": "advent_calendar_article not found"}


async def restore_advent_calendar_article(
    db: Session, id: str
) -> advent_calendar_article_schema.AdventCalendarArticleResponse:
    ac = db.query(AdventCalendarArticle).filter(AdventCalendarArticle.id == id).first()
    if ac:
        ac.deleted_at = None
        db.commit()
        db.refresh(ac)
        return ac
    else:
        return {"error": "advent_calendar_article not found"}


async def get_advent_calendar_articles_by_author(
    db: Session, id: str
) -> list[advent_calendar_article_schema.AdventCalendarArticleResponse]:
    acs = db.query(AdventCalendarArticle).filter(AdventCalendarArticle.author_id == id).all()
    return [
        {
            "id": str(ac.id),
            "advent_calendar_id": ac.advent_calendar_id,
            "day": ac.day,
            "title": ac.title,
            "author_id": ac.author_id,
            "article_id": ac.article_id,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
        }
        for ac in acs
    ]
