from sqlalchemy.orm import Session
from models.advent_calendar import AdventCalendar
import schemas.advent_calendar as advent_calendar_schema


async def get_advent_calendars(db: Session) -> list[advent_calendar_schema.AdventCalendarResponse]:
    acs = db.query(AdventCalendar).all()
    return [
        {
            "id": str(ac.id),
            "year": ac.year,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
            "articles": ac.articles,
        }
        for ac in acs
    ]
