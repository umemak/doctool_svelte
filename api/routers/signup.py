from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.signup as signup_schema
import cruds.signup as signup_crud
from db import get_db

router = APIRouter(prefix="/signup", tags=["signup"])


@router.post("", response_model=signup_schema.SignupResponse)
async def signup(request: signup_schema.SignupRequest, db: AsyncSession = Depends(get_db)):
    return await signup_crud.signup(db, request)
