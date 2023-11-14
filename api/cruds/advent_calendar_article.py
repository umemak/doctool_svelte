from sqlalchemy.orm import Session
from models.advent_calendar_article import AdventCalendarArticle
import schemas.advent_calendar_article as advent_calendar_article_schema


async def get_advent_calendar_articles(db: Session) -> list[advent_calendar_article_schema.AdventCalendarArticleResponse]:
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
