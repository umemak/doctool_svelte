import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from db import Base
from models.article_tag import ArticleTag

class Article(Base):
    __tablename__ = "articles"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    deleted_at = Column(DateTime, nullable=True)
    author_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)
    author = relationship("User", back_populates="articles")
    path = Column(String(255), nullable=False)
    filename = Column(String(255), nullable=False)
    allow_external = Column(Boolean, nullable=False, default=False)
    show_from = Column(DateTime, nullable=True)
    show_until = Column(DateTime, nullable=True)
    review_ok = Column(Boolean, nullable=False, default=False)
    tags = relationship("Tag", secondary=ArticleTag.__tablename__, back_populates="articles")
    comments = relationship("Comment", back_populates="article")
    likes = relationship("Like", back_populates="article")
    reviews = relationship("Review", back_populates="article")
