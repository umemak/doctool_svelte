from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime



class AdventCalendarCreate(BaseModel):
    year: int = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)
    
    model_config = ConfigDict(form_attributes=True)

class AdventCalendarResponse(BaseModel):
    id: str = Field(...)
    year: int = Field(...)
    title: str = Field(...)
    description: str = Field(...)
    author_id: str = Field(...)

    model_config = ConfigDict(form_attributes=True)
