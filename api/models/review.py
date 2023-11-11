import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, String, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from db import Base

class Review(Base):
    __tablename__ = "reviews"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    deleted_at = Column(DateTime, nullable=True)
    author_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)
    author = relationship("User", back_populates="reviews")
    article_id = Column(UUIDType(binary=False), ForeignKey("articles.id"), nullable=False)
    article = relationship("Article", back_populates="reviews")
    approved = Column(Boolean, nullable=False, default=False)
