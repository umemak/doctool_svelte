from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.article as article_schema
import cruds.article as article_crud
from db import get_db

router = APIRouter()


@router.get("/articles", response_model=List[article_schema.ArticleResponse])
async def get_articles(db: AsyncSession = Depends(get_db)):
    return await article_crud.get_articles(db)

@router.post("/articles", response_model=article_schema.ArticleResponse)
async def create_article(article: article_schema.ArticleCreate, db: AsyncSession = Depends(get_db)):
    return await article_crud.create_article(db, article)
