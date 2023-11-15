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


async def get_advent_calendars_by_year(db: Session, year: int) -> list[advent_calendar_schema.AdventCalendarResponse]:
    acs = db.query(AdventCalendar).filter(AdventCalendar.year == year).all()
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


async def get_advent_calendars_by_year_and_title(
    db: Session, year: int, title: str
) -> list[advent_calendar_schema.AdventCalendarResponse]:
    acs = db.query(AdventCalendar).filter(AdventCalendar.year == year, AdventCalendar.title == title).all()
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


async def get_advent_calendar(db: Session, id: str) -> advent_calendar_schema.AdventCalendarResponse:
    ac = db.query(AdventCalendar).filter(AdventCalendar.id == id).first()
    if ac:
        return {
            "id": str(ac.id),
            "year": ac.year,
            "created_at": ac.created_at,
            "updated_at": ac.updated_at,
            "deleted_at": ac.deleted_at,
            "articles": ac.articles,
        }
    else:
        return {"error": "advent_calendar not found"}


async def create_advent_calendar(
    db: Session, ac: advent_calendar_schema.AdventCalendarCreate
) -> advent_calendar_schema.AdventCalendarResponse:
    db_ac = AdventCalendar(year=ac.year, title=ac.title)
    db.add(db_ac)
    db.commit()
    db.refresh(db_ac)
    return {
        "id": str(db_ac.id),
        "year": db_ac.year,
        "created_at": db_ac.created_at,
        "updated_at": db_ac.updated_at,
        "deleted_at": db_ac.deleted_at,
        "articles": db_ac.articles,
    }
