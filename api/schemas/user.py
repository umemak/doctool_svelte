from pydantic import BaseModel, Field, ConfigDict


class UserCreate(BaseModel):
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")

    model_config = ConfigDict(form_attributes=True)


class UserUpdate(BaseModel):
    id: str = Field(..., min_length=3, max_length=50, example="id")
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")

    model_config = ConfigDict(form_attributes=True)


class UserRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")

    model_config = ConfigDict(form_attributes=True)


class UserResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserReviewResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    reviews: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserArticleResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    articles: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserLikeResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    likes: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserCommentResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    comments: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserAdventCalendarResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    advent_calendars: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserAdventCalendarArticleResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    advent_calendar_articles: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserAdventCalendarArticleLikeResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    advent_calendar_article_likes: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserAdventCalendarArticleCommentResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    advent_calendar_article_comments: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

class UserAdventCalendarArticleCommentLikeResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
    advent_calendar_article_comment_likes: list = Field(...)

    model_config = ConfigDict(form_attributes=True)

