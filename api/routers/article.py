from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

import schemas.article as article_schema
import cruds.article as article_crud
from db import get_db

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("", response_model=list[article_schema.ArticleResponse])
async def get_articles(db: AsyncSession = Depends(get_db)):
    return await article_crud.get_articles(db)


@router.get("/{id}", response_model=article_schema.ArticleResponse)
async def get_article(id: str, db: AsyncSession = Depends(get_db)):
    return await article_crud.get_article(db, id)


@router.post("", response_model=article_schema.ArticleResponse)
async def create_article(article: article_schema.ArticleCreate, db: AsyncSession = Depends(get_db)):
    return await article_crud.create_article(db, article)
