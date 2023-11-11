from datetime import datetime
import uuid
from sqlalchemy import Column, DateTime, String, Table
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from db import Base
from models.article_tag import ArticleTag


class Tag(Base):
    __tablename__ = "tags"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    deleted_at = Column(DateTime, nullable=True)
    articles = relationship("Article", secondary=ArticleTag.__tablename__, back_populates="tags")
