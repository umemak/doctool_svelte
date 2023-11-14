from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.user as user_schema
import cruds.user as user_crud
from db import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[user_schema.UserResponse])
async def get_users(db: AsyncSession = Depends(get_db)):
    return await user_crud.get_users(db)


@router.get("/{id}", response_model=user_schema.UserResponse)
async def get_user(id: str, db: AsyncSession = Depends(get_db)):
    return await user_crud.get_user(db, id)


@router.get("/email/{email}", response_model=user_schema.UserResponse)
async def get_user_by_email(email: str, db: AsyncSession = Depends(get_db)):
    return await user_crud.get_user_by_email(db, email)


@router.post("", response_model=user_schema.UserResponse)
async def create_user(user: user_schema.UserCreate, db: AsyncSession = Depends(get_db)):
    return await user_crud.create_user(db, user)
