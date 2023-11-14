from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class AdventCalendarArticleCreate(BaseModel):
    advent_calendar_id: str = Field(...)
    day: int = Field(...)
    title: str = Field(...)
    article_id: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class AdventCalendarArticleResponse(BaseModel):
    id: str = Field(...)
    advent_calendar_id: str = Field(...)
    day: int = Field(...)
    title: str = Field(...)
    article_id: str = Field(...)
    author_id: str = Field(...)
    created_at: datetime = Field(...)
    updated_at: datetime = Field(...)
    deleted_at: Optional[datetime] = Field(...)

    model_config = ConfigDict(form_attributes=True)
