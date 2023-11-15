from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class ReviewCreate(BaseModel):
    comment: str = Field(...)
    reviewer_id: str = Field(...)
    article_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ReviewUpdate(BaseModel):
    id: str = Field(...)
    comment: str = Field(...)
    approved: bool = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ReviewResponse(BaseModel):
    id: str = Field(...)
    comment: str = Field(...)
    created_at: datetime = Field(...)
    updated_at: datetime = Field(...)
    deleted_at: Optional[datetime] = Field(...)
    reviewer_id: str = Field(...)
    article_id: str = Field(...)
    approved: bool = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ReviewerResponse(BaseModel):
    id: str = Field(...)
    name: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)
