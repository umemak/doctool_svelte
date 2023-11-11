import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from db import Base


class ArticleTag(Base):
    __tablename__ = "article_tag"

    article_id = Column(UUIDType(binary=False), ForeignKey("articles.id"), primary_key=True)
    tag_id = Column(UUIDType(binary=False), ForeignKey("tags.id"), primary_key=True)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    deleted_at = Column(DateTime, nullable=True)
