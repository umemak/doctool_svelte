from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.advent_calendar_article as advent_calendar_article_schema
import cruds.advent_calendar_article as advent_calendar_article_crud
from db import get_db

router = APIRouter(prefix="/advent_calendar_articles", tags=["advent_calendar_articles"])


@router.get("", response_model=list[advent_calendar_article_schema.AdventCalendarArticleResponse])
async def get_advent_calendar_articles(db: AsyncSession = Depends(get_db)):
    return await advent_calendar_article_crud.get_advent_calendar_articles(db)


@router.get("/ac/{id}", response_model=list[advent_calendar_article_schema.AdventCalendarArticleResponse])
async def get_advent_calendar_articles_by_ac(id: str, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.get_advent_calendars_by_ac(db, id)


@router.get("/ac/{id}/{day}", response_model=list[advent_calendar_article_schema.AdventCalendarArticleResponse])
async def get_advent_calendar_articles_by_ac_and_day(id: str, day: int, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.get_advent_calendars_by_ac_and_day(db, id, day)


@router.get("/{id}", response_model=advent_calendar_article_schema.AdventCalendarArticleResponse)
async def get_advent_calendar_article(id: str, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_article_crud.get_advent_calendar_article(db, id)


@router.post("", response_model=advent_calendar_article_schema.AdventCalendarArticleResponse)
async def create_advent_calendar_article(
    ac: advent_calendar_article_schema.AdventCalendarArticleCreate, db: AsyncSession = Depends(get_db)
):
    return await advent_calendar_article_crud.create_advent_calendar_article(db, ac)
