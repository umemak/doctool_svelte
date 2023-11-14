from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.review as review_schema
import cruds.review as review_crud
from db import get_db

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=list[review_schema.ReviewResponse])
async def get_reviews(db: AsyncSession = Depends(get_db)):
    return await review_crud.get_reviews(db)


@router.get("/{id}", response_model=review_schema.ReviewResponse)
async def get_review(id: str, db: AsyncSession = Depends(get_db)):
    return await review_crud.get_review(db, id)


@router.post("", response_model=review_schema.ReviewResponse)
async def create_review(review: review_schema.ReviewCreate, db: AsyncSession = Depends(get_db)):
    return await review_crud.create_review(db, review)


@router.put("", response_model=review_schema.ReviewResponse)
async def update_review(review: review_schema.ReviewUpdate, db: AsyncSession = Depends(get_db)):
    return await review_crud.update_review(db, review)
