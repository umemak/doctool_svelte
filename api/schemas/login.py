from pydantic import BaseModel, Field, ConfigDict


class LoginRequest(BaseModel):
    email: str = Field(..., min_length=3, max_length=50, example="test@example.com")
    password: str = Field(..., min_length=8, max_length=50, example="password")

    model_config = ConfigDict(form_attributes=True)


class LoginResponse(BaseModel):
    access_token: str = Field(...)
    id: str = Field(...)
    name: str = Field(...)
    email: str = Field(...)

    model_config = ConfigDict(form_attributes=True)
