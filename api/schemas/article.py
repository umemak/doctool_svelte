from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from .user import UserResponse


class ArticleCreate(BaseModel):
    title: str = Field(..., max_length=50, example="title")
    description: str = Field(..., max_length=50, example="description")
    author_id: str = Field(..., max_length=50, example="author_id")
    path: str = Field(..., max_length=50, example="path")
    filename: str = Field(..., max_length=50, example="filename")
    filetype: str = Field(..., max_length=50, example="filetype")
    filesize: int = Field(..., example=100)
    allow_external: bool = Field(..., example=True)
    show_from: Optional[datetime] = Field(..., example="2023-11-12 00:00:00")
    show_until: Optional[datetime] = Field(..., example="2099-12-31 23:59:59")
    review_ok: bool = Field(..., example=True)

    model_config = ConfigDict(form_attributes=True)


class ArticleUpdate(BaseModel):
    id: str = Field(..., max_length=50, example="id")
    title: str = Field(..., max_length=50, example="title")
    description: str = Field(..., max_length=50, example="description")
    author_id: str = Field(..., max_length=50, example="author_id")
    path: Optional[str] = Field(..., max_length=50, example="path")
    filename: Optional[str] = Field(..., max_length=50, example="filename")
    filetype: Optional[str] = Field(..., max_length=50, example="filetype")
    filesize: Optional[int] = Field(..., example=100)
    allow_external: bool = Field(..., example=True)
    show_from: Optional[datetime] = Field(..., example="2023-11-12 00:00:00")
    show_until: Optional[datetime] = Field(..., example="2099-12-31 23:59:59")
    review_ok: Optional[bool] = Field(..., example=True)

    model_config = ConfigDict(form_attributes=True)


class ArticleResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)
    author: UserResponse = Field(...)
    created_at: datetime = Field(...)
    updated_at: datetime = Field(...)
    deleted_at: Optional[datetime] = Field(...)
    path: str = Field(...)
    filename: str = Field(...)
    filetype: str = Field(...)
    filesize: int = Field(...)
    allow_external: bool = Field(...)
    show_from: Optional[datetime] = Field(...)
    show_until: Optional[datetime] = Field(...)
    review_ok: bool = Field(...)
    tags: list = Field(...)
    comments: list = Field(...)
    likes: list = Field(...)
    reviews: list = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleCommentResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleLikeResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleReviewResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleTagResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleAuthorResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleAdventCalendarResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleAdventCalendarArticleResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)


class ArticleAdventCalendarAuthorResponse(BaseModel):
    id: str = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)
