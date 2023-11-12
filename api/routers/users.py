from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.user as user_schema
import cruds.user as user_crud
from db import get_db

router = APIRouter()


@router.get("/users/{id}", response_model=user_schema.UserResponse)
async def get_user(id: str, db: AsyncSession = Depends(get_db)):
    return await user_crud.get_user(db, id)

