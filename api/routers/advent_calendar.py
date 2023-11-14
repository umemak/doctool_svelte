from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.advent_calendar as advent_calendar_schema
import cruds.advent_calendar as advent_calendar_crud
from db import get_db

router = APIRouter(prefix="/advent_calendars", tags=["advent_calendars"])


@router.get("", response_model=list[advent_calendar_schema.AdventCalendarResponse])
async def get_advent_calendars(db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.get_advent_calendars(db)


@router.get("/year/{year}}", response_model=list[advent_calendar_schema.AdventCalendarResponse])
async def get_advent_calendars_by_year(year: int, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.get_advent_calendars_by_year(db, year)

@router.get("/year/{year}/{name}}", response_model=list[advent_calendar_schema.AdventCalendarResponse])
async def get_advent_calendars_by_year_and_name(year: int, name: str, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.get_advent_calendars_by_year_and_name(db, year, name)


@router.get("/{id}", response_model=advent_calendar_schema.AdventCalendarResponse)
async def get_advent_calendar(id: str, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.get_advent_calendar(db, id)


@router.post("", response_model=advent_calendar_schema.AdventCalendarResponse)
async def create_advent_calendar(ac: advent_calendar_schema.AdventCalendarCreate, db: AsyncSession = Depends(get_db)):
    return await advent_calendar_crud.create_advent_calendar(db, ac)
