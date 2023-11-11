from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")


class LoginResponse(BaseModel):
    access_token: str = Field(...)
