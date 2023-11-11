from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.login as login_schema
import cruds.login as login_crud
from db import get_db

router = APIRouter()


@router.post("/login", response_model=login_schema.LoginResponse)
async def login(request: login_schema.LoginRequest, db: AsyncSession = Depends(get_db)):
    return await login_crud.login(db, request)

