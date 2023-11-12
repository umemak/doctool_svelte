from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime



class ArticleCreate(BaseModel):
    title: str = Field(..., max_length=50, example="title")
    content: str = Field(..., max_length=50, example="content")
    author_id: str = Field(..., max_length=50, example="author_id")
    path: str = Field(..., max_length=50, example="path")
    filename: str = Field(..., max_length=50, example="filename")
    allow_external: bool = Field(..., example=True)
    show_from: str = Field(..., example="2023-11-12 00:00:00")
    show_until: str = Field(..., example="2099-12-31 23:59:59")
    review_ok: bool = Field(..., example=True)

    model_config = ConfigDict(form_attributes=True)


class ArticleResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    content: str = Field(...)
    author_id: str = Field(...)
    created_at: datetime = Field(...)
    updated_at: datetime = Field(...)
    deleted_at: Optional[datetime] = Field(...)
    path: str = Field(...)
    filename: str = Field(...)
    allow_external: bool = Field(...)
    show_from: datetime = Field(...)
    show_until: Optional[datetime] = Field(...)
    review_ok: bool = Field(...)
    tags: list = Field(...)
    comments: list = Field(...)
    likes: list = Field(...)
    reviews: list = Field(...)

    model_config = ConfigDict(form_attributes=True)
