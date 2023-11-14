from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")


class UserRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")


class UserResponse(BaseModel):
    id: str = Field(...)
    email: str = Field(...)
    name: str = Field(...)
